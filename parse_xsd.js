
(function($) {
 
    var indent = "  ";

    $(document).ready(function() {

        $.ajax({
            url : 'test/mugl.xsd',
            dataType: 'text',
            success: function (xmlstring) {
                handleXML(xmlstring);
            }
        });

        function handleXML(xmlstring) {

            var xmldoc = $.parseXML(xmlstring);
            var partialObjects = {};
            
            //add commas where necessary
            
            formatters = {
                'xsd:string' : function(attr){return '"'  + attr + '"';},
                'xsd:integer' : function(attr){return attr;},
                'RGBColor' : function(attr){return ('function () { '
                                            + 'return new window.multigraph.math.RGBColor.parse("' 
                                            + attr + '"); '
                                            + '}');},
                'Boolean' : function(attr){return '"'  + attr + '"';},
                'DPoint' : function(attr){return ('function () { '
                                          + 'return new window.multigraph.math.Point(' 
                                          + attr.replace(' ', ',') + '); '
                                          + '}');},
                'Frame' : function(attr){return '"'  + attr + '"';},
                'xsd:double' : function(attr){return attr;},
                'DataType' : function(attr){return '"'  + attr + '"';},
                'Displacement' : function(attr){return ('function () { '
                                                + 'return new window.multigraph.math.Displacement(' 
                                                + attr + '); '
                                                + '}');},
                'DPointOrNumber' : function(attr){return ('function () { '
                                                  + 'return new window.multigraph.math.Point(' 
                                                  + attr.replace(' ', ',') + '); '
                                                  + '}');},
                'DataOrAutoValue' : function(attr){return '"'  + attr + '"';},
                //TODO: determine how to format axis orientation, currently only undefined in defaults.js
                'AxisOrientation' : function(attr){return attr;}, 
                'DataValue' : function(attr){return '"'  + attr + '"';},
                //TODO: determine how to format datameasure, currently only null in defaults.js
                'DataMeasure' : function(attr){return attr;}, 
                'RendererType' : function(attr){return ('function () { '
                                                + 'window.multigraph.core.Renderer.Type.parse("' 
                                                + attr + '"); '
                                                + '}');}, //one of the defaults not showing up
                'Comparator' : function(attr){return '"'  + attr + '"';},
                'Insets' : function(attr){
                    if (typeof(attr)!=='object') {
                        return ('function () { '
                            + 'return new window.multigraph.math.Insets(' 
                            + '/*top*/' + attr + ', /*left*/' + attr + ', /*bottom*/' + attr + ', /*right*/' + attr + '); '
                            + '}');
                    } else {
                        return ('function () { '
                            + 'return new window.multigraph.math.Insets(' 
                            + '/*top*/' + attr.top + ', /*left*/' + attr.left + ', /*bottom*/' + attr.bottom + ', /*right*/' + attr.right + '); '
                            + '}');
                    }
                }
            };
            
            function processComplexType(obj, name, prefix){
                var output = [];
                if (prefix === undefined){
                    prefix = "";
                }
                //for each object with group[name=GraphContent], find the attribute
                obj.find('attribute').each(function(){
                    //save the default value of the attribute
                    var attrDefault = $(this).attr('default'); 

                    //check if default attribute exists before continuing
                    if(attrDefault != undefined){
                        //save the attribute type (will also be used to determine formatting)
                        var attrType = $(this).attr('type');
                        //check for annotation with type jstype, if exists replace attribute type
                        $(this).find('jstype').each(function(){
                            var partial = $(this).attr('partial');
                            var name = $(this).attr('name');
                            var type = $(this).attr('type');
                            var value = $(this).attr('value');
                            var newAttr = $(this).attr('type');

                            if(partial === 'true'){
                                if (partialObjects[name] === undefined){
                                    partialObjects[name] = {'type': [type], 'values': {}};
                                    
                                    console.log(partialObjects); 
                                }                               
                                
                                partialObjects[name]['values'][value] = attrDefault;
                            }
                            else{
                                attrType = $(this).attr('type');
                            }
                        });
                                 
                        //save the name of the attribute 
                        var attrName = $(this).attr('name'); 
                        
                        //skip if there is no default value defined or if default value is 'unknown'
                        if((attrDefault !== undefined) && (attrDefault !== 'unknown')){ 
                            try{
                                //save output
                                output.push(indent + prefix + '"' + attrName + '" : ' + formatters[attrType](attrDefault));
                            }
                            catch (e){
                                console.log("ERROR: " + e + "\nattribute name = " + attrName + " attribute type = " + attrType + " attribute default " + attrDefault);
                            }
                        }
                    }//end check if default attribute exists
                });

                //find each element from Graph Content (wherever it is defined in the page) and process it (for the attribute name, type, and default)
                obj.find('element').each(function(){
                    var subObj = undefined;
                    try {
                        //if found, save subObj
                        subObj = $(xmldoc).find('complexType[name=' + $(this).attr('type') + ']');
                    } 
                    catch (e) {
                        //else do nothing
                    }
                    if (subObj !== undefined) {
                        //process subObj for attribute name, type, and default
                        var subObjOutput = processComplexType(subObj, $(this).attr('name'), indent+prefix); 
                        //test for blank string (instead of null value)
                        if (subObjOutput !== ""){ 
                            output.push(subObjOutput);
                        }
                    }
                });
            
                //generate results if output array is not empty
                if(output.length > 0){
                    return prefix + '"' +  name + '"' + " : {\n" + output.join(",\n") + "\n" + prefix + "}";
                }
                else{
                    return "";
                }
            }

            var result = processComplexType($(xmldoc).find('group[name=GraphContent]'), 'foo');
            $('pre').append(result);
        }
        
    });
    
}(jQuery));
