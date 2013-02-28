(function ($) {
    "use strict";
    var indent = "  ";

    $(document).ready(function () {
        function handleXML(xmlstring) {
            var xmldoc = $.parseXML(xmlstring),
                result,
                formatters = {
                    'xsd:string' : function (attr) {return '"'  + attr + '"'; },
                    'xsd:integer' : function (attr) {return attr; },
                    'RGBColor' : function (attr) {return 'function () {return new window.multigraph.math.RGBColor.parse("' + attr + '"); }'; },
                    'Boolean' : function (attr) {return '"'  + attr + '"'; },
                    'DPoint' : function (attr) {return 'function () { return new window.multigraph.math.Point(' + attr.replace(' ', ',') + '); }'; },
                    'Frame' : function (attr) {return '"'  + attr + '"'; },
                    'xsd:double' : function (attr) {return attr; },
                    'DataType' : function (attr) {return '"'  + attr + '"'; },
                    'Displacement' : function (attr) {return 'function () {return new window.multigraph.math.Displacement(' + attr + '); }'; },
                    'DPointOrNumber' : function (attr) {return 'function () {return new window.multigraph.math.Point(' + attr.replace(' ', ',') + '); }'; },
                    'DataOrAutoValue' : function (attr) {return '"'  + attr + '"'; },
                    'DataValue' : function (attr) {return '"'  + attr + '"'; },
                    'RendererType' : function (attr) {return 'function () {window.multigraph.core.Renderer.Type.parse("' + attr + '"); }'; },
                    'Comparator' : function (attr) {return '"'  + attr + '"'; },
                    'Insets' : function (attr) {
                        if (typeof attr !== 'object') {
                            return 'function () {return new window.multigraph.math.Insets(/*top*/' + attr + ', /*left*/' + attr + ', /*bottom*/' + attr + ', /*right*/' + attr + '); }';
                        } else {
                            return 'function () {return new window.multigraph.math.Insets(/*top*/' + attr.values.top + ', /*left*/' + attr.values.left + ', /*bottom*/' + attr.values.bottom + ', /*right*/' + attr.values.right + '); }';
                        }
                    }
                };

            function processComplexType(obj, name, prefix) {
                var output = [],
                    partialObjects = {},
                    attrDefault,
                    attrName,
                    attrType,
                    $jstype,
                    jstypePartial,
                    jstypeType,
                    jstypeName,
                    jstypeValue;

                if (prefix === undefined) {
                    prefix = "";
                }

                //for each object with specified name, find the attribute
                obj.find('attribute').each(function () {
                    attrDefault = $(this).attr('default');
 
                   if ((attrDefault !== undefined) && (attrDefault !== 'unknown')) {
                        $jstype = $(this).find('jstype');
                        attrName = $(this).attr('name');
                        attrType = $(this).attr('type');

                        //check if jstype annotation
                        if ($jstype !== undefined && $jstype.length > 0) {
                            jstypePartial = $jstype.attr('partial');
                            jstypeType = $jstype.attr('type');
                            jstypeName = $jstype.attr('name');
                            jstypeValue = $jstype.attr('value');

                            //check if partial
                            if (jstypePartial === 'true') {
                                if (partialObjects[jstypeName] === undefined) {
                                    partialObjects[jstypeName] = {'type': [jstypeType], 'values': {}};
                                }
                                //save to partial objects
                                partialObjects[jstypeName]['values'][jstypeValue] = attrDefault;
                            } else {
                                //if jstype but not partial, save new jstype attrType for special formatting rules
                                attrType = jstypeType;
                                try {
                                    output.push(indent + prefix + '"' + attrName + '" : ' + formatters[attrType](attrDefault));
                                } catch (e) {
                                    console.log("ERROR: " + e + "\nattribute name = " + attrName + " attribute type = " + attrType + " attribute default " + attrDefault);
                                }
                            }
                        } else {
                            try {
                                output.push(indent + prefix + '"' + attrName + '" : ' + formatters[attrType](attrDefault));
                            } catch (err) {
                                console.log("ERROR: " + err + "\nattribute name = " + attrName + " attribute type = " + attrType + " attribute default " + attrDefault);
                            }
                        }
                    }
                });

                //find each element and process it (for the attribute name, type, and default)
                obj.find('element').each(function () {
                    var subObj,
                        subObjOutput;
                    try {
                        //if found, save subObj
                        subObj = $(xmldoc).find('complexType[name=' + $(this).attr('type') + ']');
                    } catch (e) {
                        //else do nothing
                    }
                    if (subObj !== undefined) {
                        //process subObj for attribute name, type, and default
                        subObjOutput = processComplexType(subObj, $(this).attr('name'), indent + prefix);
                        //test for blank string (instead of null value)
                        if (subObjOutput !== "") {
                            output.push(subObjOutput);
                        }
                    }
                });

                //adds partial objects to output
                $.each(partialObjects, function (name, obj) {
                    var type = obj.type;
                    output.push(indent + prefix + '"' + name + '" : ' + formatters[type](obj, obj.values));
                });

                //generate results if output array is not empty
                if (output.length > 0) {
                    return prefix + '"' +  name + '"' + " : {\n" + output.join(",\n") + "\n" + prefix + "}";
                } else {
                    return "";
                }

            }//end process complex type

            result = processComplexType($(xmldoc).find('group[name=GraphContent]'), 'foo');
            $('pre').append(result);


        } //end handleXML

        $.ajax({
            url : 'test/mugl.xsd',
            dataType: 'text',
            success: function (xmlstring) {
                handleXML(xmlstring);
            }
        });

    }); //end document.ready

}(jQuery));
