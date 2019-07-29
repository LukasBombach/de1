import{EventEmitter as t}from"events";function n(t,n,e,r){return new(e||(e=Promise))(function(i,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function u(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){t.done?i(t.value):new e(function(n){n(t.value)}).then(s,u)}c((r=r.apply(t,n||[])).next())})}function e(t,n){var e,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;s;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=n.call(t,s)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}var r=function(){return(r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var i in n=arguments[e])Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t}).apply(this,arguments)};function i(t,n,e,r){return new(e||(e=Promise))(function(i,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function u(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){t.done?i(t.value):new e(function(n){n(t.value)}).then(s,u)}c((r=r.apply(t,n||[])).next())})}function o(t,n){var e,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;s;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=n.call(t,s)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}var s=function(){function t(){this.items=[],this.working=!1}return t.prototype.add=function(t){return i(this,void 0,void 0,function(){var n=this;return o(this,function(e){return[2,new Promise(function(e,r){n.items.push(n.getItem(t,e,r)),n.work()})]})})},t.prototype.end=function(t){return void 0===t&&(t=function(){}),i(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return this.items=[],[4,t()];case 1:return[2,n.sent()]}})})},t.prototype.work=function(){return i(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:if(this.working)return[2];this.working=!0,t.label=1;case 1:return this.items.length?[4,this.items.shift()()]:[3,3];case 2:return t.sent(),[3,1];case 3:return this.working=!1,[2]}})})},t.prototype.getItem=function(t,n,e){var r=this.getItemAsFn(t);return function(){return r().then(n).catch(e)}},t.prototype.getItemAsFn=function(t){var n=this;return"function"!=typeof t?function(){return i(n,void 0,void 0,function(){return o(this,function(n){return[2,t]})})}:function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return i(n,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,t.apply(void 0,e)];case 1:return[2,n.sent()]}})})}},t}(),u={read:!1,write:!1,notify:!1},c=function(){function n(n,e,r,i){this.eventEmitter=new t,this.isNotifying=!1,this.service=n,this.uuid=e,this.converter=r,this.properties=i,this.adapter=n.adapter}return n.fromNoble=function(t,e,r){for(var i=Object.assign({},u),o=0,s=e.properties;o<s.length;o++)i[s[o]]=!0;return new n(t,e.uuid,r,i)},n.prototype.read=function(){return i(this,void 0,void 0,function(){var t;return o(this,function(n){switch(n.label){case 0:return[4,this.dispatchRead()];case 1:return t=n.sent(),[4,this.decode(t)];case 2:return[2,n.sent()]}})})},n.prototype.write=function(t){return i(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,this.encode(t)];case 1:return n=e.sent(),[4,this.dispatchWrite(n)];case 2:return e.sent(),[2]}})})},n.prototype.on=function(t,n){return i(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return this.eventEmitter.on(t,n),this.isNotifying?[3,2]:[4,this.startNotifing()];case 1:e.sent(),e.label=2;case 2:return[2]}})})},n.prototype.off=function(t,n){return i(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return this.eventEmitter.listenerCount("notify")?[3,2]:[4,this.stopNotifing()];case 1:e.sent(),e.label=2;case 2:return this.eventEmitter.off(t,n),[2]}})})},n.prototype.decode=function(t){return i(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return this.converter&&this.converter.decode?[4,this.converter.decode(t)]:[2,t];case 1:return[2,n.sent()]}})})},n.prototype.encode=function(t){return i(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return this.converter&&this.converter.encode?[4,this.converter.encode(t)]:[2,t];case 1:return[2,n.sent()]}})})},n.prototype.startNotifing=function(){return i(this,void 0,void 0,function(){var t;return o(this,function(n){switch(n.label){case 0:return this.isNotifying?[2]:(this.adapter.on("read",this.onNotify.bind(this)),t=this,[4,this.notify(!0)]);case 1:return t.isNotifying=n.sent(),[2]}})})},n.prototype.stopNotifing=function(){return i(this,void 0,void 0,function(){var t;return o(this,function(n){switch(n.label){case 0:return this.isNotifying?(this.adapter.off("read",this.onNotify.bind(this)),t=this,[4,this.notify(!1)]):[2];case 1:return t.isNotifying=n.sent(),[2]}})})},n.prototype.onNotify=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return i(this,void 0,void 0,function(){var n,e,r,i,s,u,c,a;return o(this,function(o){switch(o.label){case 0:return n=t[0],e=t[1],r=t[2],i=t[3],s=t[4],this.isThis(n,e,r)?(c=(u=this.eventEmitter).emit,a=["notify"],[4,this.decode(i)]):[2];case 1:return c.apply(u,a.concat([o.sent(),{isNfy:s}])),[2]}})})},n.prototype.isThis=function(t,n,e){return this.getUuids().every(function(r,i){return r===[t,n,e][i]})},n.prototype.getUuids=function(){return[this.service.peripheral.uuid,this.service.uuid,this.uuid]},n.prototype.dispatchRead=function(){return i(this,void 0,void 0,function(){var t,n,e,r,i=this;return o(this,function(o){switch(o.label){case 0:return t=this.getUuids(),n=t[0],e=t[1],r=t[2],[4,this.adapter.run(function(){return i.adapter.read(n,e,r)},function(){return i.adapter.when("read",function(t,n,e){return i.isThis(t,n,e)})},function(t){return t[3]})];case 1:return[2,o.sent()]}})})},n.prototype.dispatchWrite=function(t){return i(this,void 0,void 0,function(){var n,e,r,i,s=this;return o(this,function(o){switch(o.label){case 0:return n=this.getUuids(),e=n[0],r=n[1],i=n[2],[4,this.adapter.run(function(){return s.adapter.write(e,r,i,t,!0)},function(){return s.adapter.when("write",function(t,n,e){return s.isThis(t,n,e)})})];case 1:return o.sent(),[2]}})})},n.prototype.notify=function(t){return i(this,void 0,void 0,function(){var n,e,r,i,s=this;return o(this,function(o){switch(o.label){case 0:return n=this.getUuids(),e=n[0],r=n[1],i=n[2],[4,this.adapter.run(function(){return s.adapter.notify(e,r,i,t)},function(){return s.adapter.when("notify",function(t,n,e){return s.isThis(t,n,e)})},function(t){return t[3]})];case 1:return[2,o.sent()]}})})},n}(),a=function(){function t(t,n,e){void 0===e&&(e=[]),this.peripheral=t,this.adapter=t.adapter,this.converters=e,this.uuid=n}return t.prototype.read=function(t){return i(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this.getCharacteristic(t)];case 1:return[4,n.sent().read()];case 2:return[2,n.sent()]}})})},t.prototype.write=function(t,n){return i(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,this.getCharacteristic(t)];case 1:return[4,e.sent().write(n)];case 2:return e.sent(),[2]}})})},t.prototype.on=function(t,n){return i(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,this.getCharacteristic(t)];case 1:return[4,e.sent().on("notify",n)];case 2:return e.sent(),[2]}})})},t.prototype.off=function(t,n){return i(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,this.getCharacteristic(t)];case 1:return[4,e.sent().off("notify",n)];case 2:return e.sent(),[2]}})})},t.prototype.getCharacteristic=function(t){return i(this,void 0,void 0,function(){var n,e,r;return o(this,function(i){switch(i.label){case 0:return[4,this.getCharacteristics()];case 1:if(n=i.sent(),e=this.getConverter(t),!(r=n[e?e.uuid:t]))throw new Error("Cannot find characteristic");return[2,r]}})})},t.prototype.getCharacteristics=function(){return i(this,void 0,void 0,function(){var t,n,e=this;return o(this,function(r){switch(r.label){case 0:return this.characteristics?[2,this.characteristics]:[4,this.fetchCharacteristics()];case 1:return t=r.sent(),n=t.map(function(t){return e.getCFromN(t)}),this.characteristics=this.uuidMap(n),[2,this.characteristics]}})})},t.prototype.getIds=function(){return[this.peripheral.uuid,this.uuid]},t.prototype.isThis=function(t,n){return t===this.peripheral.uuid&&n===this.uuid},t.prototype.getConverter=function(t){return this.converters.find(function(n){return[n.name,n.uuid].includes(t)})},t.prototype.uuidMap=function(t){return t.reduce(function(t,n){var e;return r({},t,((e={})[n.uuid]=n,e))},{})},t.prototype.getCFromN=function(t){return c.fromNoble(this,t,this.getConverter(t.uuid))},t.prototype.fetchCharacteristics=function(){return i(this,void 0,void 0,function(){var t,n,e,r,i=this;return o(this,function(o){switch(o.label){case 0:return t=this.getIds(),n=t[0],e=t[1],r=function(t,n){return i.isThis(t,n)},[4,this.adapter.run(function(){return i.adapter.discoverCharacteristics(n,e,[])},function(){return i.adapter.when("characteristicsDiscover",r)},function(t){return t[2]})];case 1:return[2,o.sent()]}})})},t}(),h=function(){function t(t,n){this.name="",this.advertisement={},this.manufacturerData=Buffer.from(""),this.state="disconnected",this.adapter=t,this.uuid=n}return t.fromDiscover=function(n,e){var r=new t(n,e[0]);return r.address=e[1],r.addressType=e[2],r.connectable=e[3],r.advertisement=e[4]||{},r.manufacturerData=r.advertisement.manufacturerData||Buffer.from(""),r.name=r.advertisement.localName||r.manufacturerData.toString("hex"),r},t.prototype.connect=function(){return i(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return this.state="connecting",[4,this.dispatchConnect()];case 1:return t.sent(),this.state="connected",[2]}})})},t.prototype.disconnect=function(){return i(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return this.state="disconnecting",[4,this.dispatchDisconnect()];case 1:return t.sent(),this.state="disconnected",[2]}})})},t.prototype.getService=function(t,n){return i(this,void 0,void 0,function(){var e;return o(this,function(r){switch(r.label){case 0:return[4,this.getServices((e={},e[t]=n,e))];case 1:return[2,r.sent().find(function(n){return n.uuid===t})]}})})},t.prototype.getServices=function(t){return void 0===t&&(t={}),i(this,void 0,void 0,function(){var n,e=this;return o(this,function(r){switch(r.label){case 0:return"disconnected"!==this.state?[3,2]:[4,this.connect()];case 1:r.sent(),r.label=2;case 2:return this.serviceUuids?[3,4]:(n=this,[4,this.fetchServices()]);case 3:n.serviceUuids=r.sent(),r.label=4;case 4:return[2,this.serviceUuids.map(function(n){return new a(e,n,t[n])})]}})})},t.prototype.hasService=function(t){return i(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this.getServices()];case 1:return[2,n.sent().some(function(n){return n.uuid===t})]}})})},t.prototype.getRssi=function(){return i(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return"disconnected"!==this.state?[3,2]:[4,this.connect()];case 1:t.sent(),t.label=2;case 2:return[4,this.fetchRssi()];case 3:return[2,t.sent()]}})})},t.prototype.isConnected=function(){return"connected"===this.state},t.prototype.fetchServices=function(){return i(this,void 0,void 0,function(){var t=this;return o(this,function(n){switch(n.label){case 0:return[4,this.adapter.run(function(){return t.adapter.discoverServices(t.uuid,[])},function(){return t.adapter.when("servicesDiscover",function(n){return n===t.uuid})},function(t){return t[1]})];case 1:return[2,n.sent()]}})})},t.prototype.fetchRssi=function(){return i(this,void 0,void 0,function(){var t=this;return o(this,function(n){switch(n.label){case 0:return[4,this.adapter.run(function(){return t.adapter.updateRssi(t.uuid)},function(){return t.adapter.when("rssiUpdate",function(n){return n===t.uuid})},function(t){return t[1]})];case 1:return[2,n.sent()]}})})},t.prototype.dispatchConnect=function(){return i(this,void 0,void 0,function(){var t=this;return o(this,function(n){switch(n.label){case 0:return[4,this.adapter.run(function(){return t.adapter.connect(t.uuid)},function(){return t.adapter.when("connect",function(n){return n===t.uuid})})];case 1:return n.sent(),[2]}})})},t.prototype.dispatchDisconnect=function(){return i(this,void 0,void 0,function(){var t=this;return o(this,function(n){switch(n.label){case 0:return[4,this.adapter.run(function(){return t.adapter.disconnect(t.uuid)},function(){return t.adapter.when("disconnect",function(n){return n===t.uuid})})];case 1:return n.sent(),[2]}})})},t}(),f=function(){function t(t){this.bindings=t}return t.prototype.init=function(){this.bindings.init()},t.prototype.startScanning=function(t,n){this.bindings.startScanning(t,n)},t.prototype.stopScanning=function(){this.bindings.stopScanning()},t.prototype.connect=function(t){this.bindings.connect(t)},t.prototype.disconnect=function(t){this.bindings.disconnect(t)},t.prototype.updateRssi=function(t){this.bindings.updateRssi(t)},t.prototype.discoverServices=function(t,n){this.bindings.discoverServices(t,n)},t.prototype.discoverIncludedServices=function(t,n,e){this.bindings.discoverIncludedServices(t,n,e)},t.prototype.discoverCharacteristics=function(t,n,e){this.bindings.discoverCharacteristics(t,n,e)},t.prototype.read=function(t,n,e){this.bindings.read(t,n,e)},t.prototype.write=function(t,n,e,r,i){this.bindings.write(t,n,e,r,i)},t.prototype.broadcast=function(t,n,e,r){this.bindings.broadcast(t,n,e,r)},t.prototype.notify=function(t,n,e,r){this.bindings.notify(t,n,e,r)},t.prototype.discoverDescriptors=function(t,n,e){this.bindings.discoverDescriptors(t,n,e)},t.prototype.readValue=function(t,n,e,r){this.bindings.readValue(t,n,e,r)},t.prototype.writeValue=function(t,n,e,r,i){this.bindings.writeValue(t,n,e,r,i)},t.prototype.readHandle=function(t,n){this.bindings.readHandle(t,n)},t.prototype.writeHandle=function(t,n,e,r){this.bindings.writeHandle(t,n,e,r)},t.prototype.on=function(t,n){this.bindings.on(t,n)},t.prototype.off=function(t,n){this.bindings.off(t,n)},t.prototype.once=function(t,n){this.bindings.once(t,n)},t.prototype.run=function(t,n){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];return i(this,void 0,void 0,function(){var r,i,s,u,c,a;return o(this,function(o){switch(o.label){case 0:return[4,Promise.all([n(),t()])];case 1:r=o.sent()[0],i=e.slice(0,-1),s=e.slice(-1).pop(),u=0,c=i,o.label=2;case 2:return u<c.length?[4,(0,c[u])(r)]:[3,5];case 3:o.sent(),o.label=4;case 4:return u++,[3,2];case 5:return(a=s)?[4,s(r)]:[3,7];case 6:a=o.sent(),o.label=7;case 7:return[2,a||r]}})})},t.prototype.when=function(t,n){var e=this;return new Promise(function(r,u){var c=new s,a=function(){for(var s=[],u=0;u<arguments.length;u++)s[u]=arguments[u];return i(e,void 0,void 0,function(){var e;return o(this,function(i){switch(i.label){case 0:return[4,c.add(function(){return n.apply(void 0,s)})];case 1:return(e=i.sent())?[4,c.end(function(){return r(s)})]:[3,3];case 2:i.sent(),i.label=3;case 3:return e&&this.off(t,a),[2]}})})};e.on(t,a)})},t.prototype.asPeripheral=function(t){var n=this;return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t(h.fromDiscover(n,e))}},t}(),d=function(){function t(){this.adapter=new f(t.bindings),this.scanListener=function(){}}return t.powerOn=function(){return i(this,void 0,void 0,function(){var n;return o(this,function(e){switch(e.label){case 0:return[4,(n=new t).powerOn()];case 1:return e.sent(),[2,n]}})})},t.connect=function(n){return i(this,void 0,void 0,function(){var e;return o(this,function(r){switch(r.label){case 0:return[4,t.powerOn()];case 1:return[4,r.sent().find(n)];case 2:return[4,(e=r.sent()).connect()];case 3:return r.sent(),[2,e]}})})},t.prototype.powerOn=function(){return i(this,void 0,void 0,function(){var t=this;return o(this,function(n){switch(n.label){case 0:return[4,this.adapter.run(function(){return t.adapter.init()},function(){return t.adapter.when("stateChange",function(t){return"poweredOn"===t})})];case 1:return n.sent(),[2]}})})},t.prototype.find=function(t){return i(this,void 0,void 0,function(){var n=this;return o(this,function(e){switch(e.label){case 0:return[4,this.adapter.run(function(){return n.adapter.startScanning()},function(){return n.adapter.when("discover",n.getFindCondition(t))},function(){return n.adapter.stopScanning()},function(t){return h.fromDiscover(n.adapter,t)})];case 1:return[2,e.sent()]}})})},t.prototype.startScanning=function(t){void 0===t&&(t=function(){}),this.adapter.off("discover",this.scanListener),this.scanListener=this.adapter.asPeripheral(t),this.adapter.on("discover",this.scanListener),this.adapter.startScanning()},t.prototype.stopScanning=function(){this.adapter.off("discover",this.scanListener),this.scanListener=function(){},this.adapter.stopScanning()},t.prototype.getFindCondition=function(t){return"function"==typeof t?this.adapter.asPeripheral(t):this.adapter.asPeripheral(function(n){return[n.uuid,n.address,n.name].includes(t)})},t}(),p=function(){function t(t){this.dataView=this.getDataView(t),this.offset=0,this.varsInternal={}}return t.prototype.char=function(t){var n=this.dataView.getUint8(this.offset);return this.setVar(t,n),this.offset+=1,this},t.prototype.short=function(t,n){void 0===n&&(n=1);var e=this.dataView.getUint16(this.offset,!1)/n;return this.setVar(t,e),this.offset+=2,this},t.prototype.int=function(t){var n=this.dataView.getUint32(this.offset,!0);return this.setVar(t,n),this.offset+=4,this},t.prototype.sha=function(t){var n=this.dataView.getUint32(this.offset,!0).toString(16),e="0"===n?"":n;return this.setVar(t,e),this.offset+=4,this},t.prototype.vars=function(){return this.varsInternal},t.prototype.getDataView=function(t){return t instanceof DataView?t:new DataView(t.buffer)},t.prototype.setVar=function(t,n){var e=t.split("."),r=e[e.length-1],i=this.varsInternal;e.slice(0,-1).forEach(function(t){void 0===i[t]&&(i[t]={}),i=i[t]}),i[r]=n},t}(),l=function(){function t(){this.values=[]}return t.prototype.char=function(t){return this.add("Uint8",t),this},t.prototype.short=function(t){return this.add("Uint16",t,!1),this},t.prototype.int=function(t){return this.add("Uint16",t,!0),this},t.prototype.sha=function(t){return this.add("Uint16",parseInt(t,16),!0),this},t.prototype.dataView=function(){var t=this.getBufferLength(),n=new ArrayBuffer(t),e=new DataView(n);return this.setValues(e),e},t.prototype.buffer=function(){return Buffer.from(this.dataView().buffer)},t.prototype.setValues=function(t,n){var e=this;void 0===n&&(n=0),this.values.forEach(function(r){var i=r.type,o=r.value,s=r.littleEndian;t["set"+i](n,o,s),n+=e.typeLength(i)})},t.prototype.add=function(t,n,e){void 0!==n&&this.values.push({type:t,value:n,littleEndian:e})},t.prototype.getBufferLength=function(){var t=this;return this.values.map(function(n){var e=n.type;return t.typeLength(e)}).reduce(function(t,n){return t+n},0)},t.prototype.typeLength=function(n){return t.bufferLengths[n]},t.bufferLengths={Uint8:1,Uint16:2,Uint32:4},t}(),v={name:"state",uuid:"a003",encode:function(t){if(void 0===y[t])throw new Error('Unknown state "'+t+'"');return function(t){return(new l).char(y[t]).char(0).buffer()}(t)},decode:function(t){var n=function(t){return new p(t).char("state").char("substate").vars()}(t).state,e=function(t){for(var n in y)if(y[n]===t)return n}(n);if(!e)throw new Error("Received unexpected state "+n);return e}},y={sleep:0,goingToSleep:1,idle:2,busy:3,espresso:4,steam:5,hotWater:6,shortCal:7,selfTest:8,longCal:9,descale:10,fatalError:11,init:12,noRequest:13,skipToNext:14,hotWaterRinse:15,steamRinse:16,refill:17,clean:18,inBootLoader:19,airPurge:20};var w=[v],g=function(){function t(){}return t.prototype.getAdapter=function(){if(!this.machine)throw new Error("No Machine, not connected?");return this.machine.adapter},t.connect=function(){return n(this,void 0,void 0,function(){var n;return e(this,function(e){switch(e.label){case 0:return[4,(n=new t).connect()];case 1:return e.sent(),[2,n]}})})},t.prototype.connect=function(){return n(this,void 0,void 0,function(){var n,r;return e(this,function(e){switch(e.label){case 0:return this.isConnected()?[2]:(d.bindings=t.bindings,n=this,[4,d.connect("DE1")]);case 1:return n.machine=e.sent(),r=this,[4,this.machine.getService("a000",w)];case 2:return r.service=e.sent(),[2]}})})},t.prototype.disconnect=function(){return n(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return this.isConnected()?[4,this.machine.disconnect()]:[2];case 1:return t.sent(),this.machine=void 0,this.service=void 0,[2]}})})},t.prototype.turnOn=function(){return n(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return[4,this.isTurnedOn()];case 1:return t.sent()?[3,3]:[4,this.set("state","idle")];case 2:t.sent(),t.label=3;case 3:return[4,this.get("state")];case 4:return[2,t.sent()]}})})},t.prototype.turnOff=function(){return n(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return[4,this.set("state","sleep")];case 1:return t.sent(),[4,this.get("state")];case 2:return[2,t.sent()]}})})},t.prototype.isTurnedOn=function(){return n(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return[4,this.get("state")];case 1:return[2,"sleep"!==t.sent()]}})})},t.prototype.startEspresso=function(){return n(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return[4,this.set("state","espresso")];case 1:return[2,t.sent()]}})})},t.prototype.getWaterlevel=function(){return n(this,void 0,void 0,function(){return e(this,function(t){switch(t.label){case 0:return[4,this.get("water")];case 1:return[2,t.sent().level]}})})},t.prototype.isConnected=function(){return!!this.machine&&this.machine.isConnected()},t.prototype.get=function(t){return n(this,void 0,void 0,function(){return e(this,function(n){switch(n.label){case 0:return[4,this.getService().read(t)];case 1:return[2,n.sent()]}})})},t.prototype.set=function(t,r){return n(this,void 0,void 0,function(){return e(this,function(n){switch(n.label){case 0:return[4,this.getService().write(t,r)];case 1:return[2,n.sent()]}})})},t.prototype.on=function(t,r){return n(this,void 0,void 0,function(){return e(this,function(n){switch(n.label){case 0:return[4,this.getService().on(t,r)];case 1:return n.sent(),[2]}})})},t.prototype.off=function(t,r){return n(this,void 0,void 0,function(){return e(this,function(n){switch(n.label){case 0:return[4,this.getService().off(t,r)];case 1:return n.sent(),[2]}})})},t.prototype.getService=function(){if(!this.isConnected())throw new Error("Not connected to DE1");if(!this.service)throw new Error("Could not read service");return this.service},t}();export default g;
