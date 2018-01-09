!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _specimen=__webpack_require__(7),_specimen2=_interopRequireDefault(_specimen),args=QueryString.get(document.currentScript.src);$(function(){var biobankSpecimen=React.createElement("div",{className:"page-specimen-form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-9 col-lg-12"},React.createElement(_specimen2.default,{DataURL:loris.BaseURL+"/biobank/ajax/FileUpload.php?action=getSpecimenData&barcode="+args.barcode,action:loris.BaseURL+"/biobank/ajax/FileUpload.php?action=specimen"}))));ReactDOM.render(biobankSpecimen,document.getElementById("lorisworkspace"))})},,function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Panel=function(_React$Component){function Panel(props){_classCallCheck(this,Panel);var _this=_possibleConstructorReturn(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this,props));return _this.state={collapsed:_this.props.initCollapsed},_this.panelClass=_this.props.initCollapsed?"panel-collapse collapse":"panel-collapse collapse in",_this.toggleCollapsed=_this.toggleCollapsed.bind(_this),_this}return _inherits(Panel,_React$Component),_createClass(Panel,[{key:"toggleCollapsed",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var glyphClass=this.state.collapsed?"glyphicon pull-right glyphicon-chevron-down":"glyphicon pull-right glyphicon-chevron-up",panelHeading=this.props.title?React.createElement("div",{className:"panel-heading",onClick:this.toggleCollapsed,"data-toggle":"collapse","data-target":"#"+this.props.id,style:{cursor:"pointer"}},this.props.title,React.createElement("span",{className:glyphClass})):"";return React.createElement("div",{className:"panel panel-primary"},panelHeading,React.createElement("div",{id:this.props.id,className:this.panelClass,role:"tabpanel"},React.createElement("div",{className:"panel-body",style:{height:this.props.height}},this.props.children)))}}]),Panel}(React.Component);Panel.propTypes={id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string},Panel.defaultProps={initCollapsed:!1,id:"default-panel",height:"100%"},exports.default=Panel},,,,,function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),BiobankSpecimen=function(_React$Component){function BiobankSpecimen(props){_classCallCheck(this,BiobankSpecimen);var _this=_possibleConstructorReturn(this,(BiobankSpecimen.__proto__||Object.getPrototypeOf(BiobankSpecimen)).call(this,props));return _this.state={Data:{},collectionData:{},uploadResult:null,isLoaded:!1,loadedData:0},_this.handleSubmit=_this.handleSubmit.bind(_this),_this.setCollectionData=_this.setCollectionData.bind(_this),_this.showAlertMessage=_this.showAlertMessage.bind(_this),_this}return _inherits(BiobankSpecimen,_React$Component),_createClass(BiobankSpecimen,[{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){var collectionData={specimen:data.specimenData,container:data.containerData,parentSpecimenBarcode:data.parentSpecimenBarcode,parentContainerBarcode:data.parentContainerBarcode};({specimenTypes:data.specimenTypes,containerTypes:data.containerTypes});self.setState({Data:data,isLoaded:!0,collectionData:collectionData})},error:function(_error,errorCode,errorMsg){console.error(_error,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"render",value:function(){if(void 0!==this.state.error)return React.createElement("div",{className:"alert alert-danger text-center"},React.createElement("strong",null,this.state.error));if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var alertMessage="",alertClass="alert text-center hide",backURL=loris.BaseURL.concat("/biobank/");if(this.state.uploadResult&&("success"===this.state.uploadResult?(alertClass="alert alert-success text-center",alertMessage="Update Successful!"):"error"===this.state.uploadResult&&(alertClass="alert alert-danger text-center",alertMessage="Failed to update the file")),this.state.collectionData.parentSpecimenBarcode)var specimenURL=loris.BaseURL+"/biobank/specimen/?barcode=",parentSpecimenBarcode=React.createElement(LinkElement,{label:"Parent Specimen",text:this.state.collectionData.parentSpecimenBarcode,href:specimenURL+this.state.collectionData.parentSpecimenBarcode});if(this.state.collectionData.parentContainerBarcode)var containerURL=loris.BaseURL+"/biobank/container/?barcode=",parentContainerBarcode=React.createElement(LinkElement,{label:"Parent Container",text:this.state.collectionData.parentContainerBarcode,href:containerURL+this.state.collectionData.parentContainerBarcode});if(this.state.collectionData.specimen.data)var dataObject=this.state.collectionData.specimen.data,dataArray=Object.keys(dataObject).map(function(key){return React.createElement(StaticElement,{label:key,text:dataObject[key]})});var location;return location=this.state.Data.containerLoci[this.state.collectionData.container.locusId].location_id?React.createElement(StaticElement,{label:"Location ",text:this.state.Data.siteInfo[this.state.Data.containerLoci[this.state.collectionData.container.locusId].location_id].Name}):React.createElement(StaticElement,{label:"Destination ",text:this.state.Data.siteInfo[this.state.Data.containerLoci[this.state.collectionData.container.locusId].destination_id].Name+" (In Transit)"}),React.createElement("div",null,React.createElement("div",{className:alertClass,role:"alert",ref:"alert-message"},alertMessage),"success"===this.state.uploadResult?React.createElement("a",{className:"btn btn-primary",href:backURL},"Back to biobank"):null,React.createElement("h3",null,"Specimen ",React.createElement("strong",null,this.state.collectionData.container.barcode)),React.createElement(FormElement,{columns:4},React.createElement(LinkElement,{label:"PSCID",text:this.state.Data.candidateInfo[""].PSCID,href:loris.BaseURL+"/"+this.state.Data.candidateInfo[""].CandID}),React.createElement(LinkElement,{label:"Visit Label",text:this.state.Data.sessionInfo[""].Visit_label,href:loris.BaseURL+"/instrument_list/?candID="+this.state.Data.candidateInfo[""].CandID+"&sessionID="+this.state.Data.sessionInfo[""].ID}),React.createElement(StaticElement,{label:"Status",text:this.state.Data.containerStati[this.state.collectionData.container.statusId].label}),location,parentSpecimenBarcode,parentContainerBarcode),React.createElement(FormElement,{columns:3},React.createElement(_Panel2.default,{id:"collection-panel",title:"Collection"},React.createElement(FormElement,{name:"biobankSpecimen",onSubmit:this.handleSubmit,ref:"form"},React.createElement(StaticElement,{label:"Type",text:this.state.Data.specimenTypes[this.state.collectionData.specimen.typeId].label}),React.createElement(StaticElement,{label:"Quantity",text:this.state.collectionData.specimen.quantity+" "+this.state.Data.containerUnits[this.state.Data.containerCapacities[this.state.Data.containerTypes[this.state.collectionData.container.typeId].capacity_id].unit_id].unit}),React.createElement(StaticElement,{label:"Container Type",text:this.state.Data.containerTypes[this.state.collectionData.container.typeId].label}),React.createElement(StaticElement,{label:"Site",text:this.state.Data.siteInfo[this.state.Data.containerLoci[this.state.collectionData.container.locusId].origin_id].Name}),React.createElement(StaticElement,{label:"Collection Time",text:this.state.collectionData.specimen.timeCollect}),dataArray,React.createElement(StaticElement,{label:"Notes",text:this.state.collectionData.specimen.notes}))),React.createElement(_Panel2.default,{id:"preparation-panel",title:"Preparation"}),React.createElement(_Panel2.default,{id:"analysis-panel",title:"Analysis"})))}},{key:"handleSubmit",value:function(e){e.preventDefault();var self=this,myCollectionData=this.state.formData;$("#biobankSpecimenEl").hide(),$("#file-progress").removeClass("hide"),$.ajax({type:"POST",url:self.props.action,data:JSON.stringify(myCollectionData),cache:!1,contentType:!1,processData:!1,xhr:function xhr(){var xhr=new window.XMLHttpRequest;return xhr.upload.addEventListener("progress",function(evt){if(evt.lengthComputable){var progressbar=$("#progressbar"),progresslabel=$("#progresslabel"),percent=Math.round(evt.loaded/evt.total*100);$(progressbar).width(percent+"%"),$(progresslabel).html(percent+"%"),progressbar.attr("aria-valuenow",percent)}},!1),xhr},success:function(data){$("#file-progress").addClass("hide"),self.setState({uploadResult:"success"}),self.showAlertMessage()},error:function(err){console.error(err),self.setState({uploadResult:"error"}),self.showAlertMessage()}})}},{key:"setCollectionData",value:function(formElement,value){var collectionData=this.state.collectionData;""===value?collectionData[formElement]=null:collectionData[formElement]=value,this.setState({collectionData:collectionData})}},{key:"showAlertMessage",value:function(){var self=this;if(null!==this.refs["alert-message"]){var alertMsg=this.refs["alert-message"];$(alertMsg).fadeTo(2e3,500).delay(3e3).slideUp(500,function(){self.setState({uploadResult:null})})}}}]),BiobankSpecimen}(React.Component);BiobankSpecimen.propTypes={DataURL:React.PropTypes.string.isRequired,action:React.PropTypes.string.isRequired};var RBiobankSpecimen=React.createFactory(BiobankSpecimen);window.BiobankSpecimen=BiobankSpecimen,window.RBiobankSpecimen=RBiobankSpecimen,exports.default=BiobankSpecimen}]);
//# sourceMappingURL=specimenIndex.js.map