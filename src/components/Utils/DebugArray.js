// import EventEmitter from './EventEmitter.js';

// export default class DebugArray extends EventEmitter{
//     constructor(array, color, gui, folderName, folderClosed, defaultValue, options, updateCallback){
//         super();
//         //setup
//         this.array = array;
//         this.color = color;
//         this.gui = gui;
//         this.folderName = folderName;
//         this.folderClosed = folderClosed;
//         this.defaultValue = defaultValue;
//         this.options = options;
//         this.updateCallback = updateCallback;
//         let remove = [];
//         for(let i = 0; i < this.array.length; i++){
//             remove[i] = ()=>{
//                 this.removeArrayElement(i);
//             };
//         }
//         const add = ()=>{
//             this.addArrayElement()
//         };
//         this.arrayHelper = {
//             remove: remove,
//             add: add
//         };
//         this.guiFolder = this.gui.addFolder(this.folderName);
//         if(this.folderClosed){
//             this.guiFolder.close();
//         }
//         this.update();
//     }
//     addArrayElement(){
//         this.array.push(this.defaultValue);
//         const i = this.array.length - 1;
//         this.arrayHelper.remove.push(()=>{
//             this.removeArrayElement(i);
//         });
//         this.update();
//     }
//     removeArrayElement(i){
//         this.array.splice(i,1);
//         this.arrayHelper.remove.splice(this.arrayHelper.remove.length - 1, 1);
//         if(this.array.length == 0){
//             this.addArrayElement();
//         }
//         this.update();
//     }
//     update(){
//         this.guiFolder.destroy();
//         this.guiFolder = this.gui.addFolder(this.folderName);
//         if(this.folderClosed){
//             this.guiFolder.close();
//         }
//         for(let i = 0; i < this.array.length; i++){
//             if(this.color){
//                 this.guiFolder.addColor(this.array, i, this.options).onFinishChange(this.updateCallback);
//             }else{
//                 this.guiFolder.add(this.array, i, this.options).onFinishChange(this.updateCallback);
//             }
//             this.guiFolder.add(this.arrayHelper.remove, i).name('×');
//         }
//         this.guiFolder.add(this.arrayHelper, 'add').name('+');
//         this.updateCallback();
//     }
// };
