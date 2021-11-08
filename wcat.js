#!/usr/bin/env node

let fs=require("fs");
let ip=process.argv.slice(2);
// console.log(ip);


let optionArr=[];
let fileArr=[];
for(let i=0;i<ip.length;i++){
   let firstchar= ip[i].charAt(0);
   if(firstchar=='-'){
       optionArr.push(ip[i]);
   }else{
       fileArr.push(ip[i]);
   }
}

let isbothpresent=optionArr.includes("-b") && optionArr.includes("-n");
if(isbothpresent){
    console.log("Either enter -b option or -n option...");
    return ;
}
for(let i=0;i<fileArr.length;i++){
    let ispresent=fs.existsSync(fileArr[i]);
    if(ispresent==false){
        console.log(`File ${fileArr[i]} is not present`);
        return;
    }
}

//\r line ke last mein pahucha deta hai vs code add karta hai
let content="";
for(let i=0;i<fileArr.length;i++){
 let buffercontent= fs.readFileSync(fileArr[i]);
 content+=buffercontent +"\r\n";      
}

// console.log(content);

let contentArr=[];
contentArr=content.split("\r\n");

// console.log(contentArr);


let isSpresent=optionArr.includes("-s");
if(isSpresent == true){
    for (let i=1; i < contentArr.length; i++ )        
    {
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        } 
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let temp=[];
    
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            temp.push(contentArr[i]);
        }
    }
    contentArr=temp;
}

 console.log('``````````````````````');

// console.log(contentArr);
// console.log(contentArr.join("\n"));

let isNpresent=optionArr.includes("-n");
if(isNpresent==true){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=`${i+1}. ${contentArr[i]}`;
    }
}
// console.log(contentArr);
// console.log(contentArr.join("\n"));

let cnt=1;
let isBpresent=optionArr.includes("-b");
if(isBpresent==true){
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=`${cnt}. ${contentArr[i]}`;
            cnt++;
        }
    }
}

 console.log(contentArr.join("\n"));