import { from, Observable, observable, empty, of  } from 'rxjs'
import { map, filter, merge, mergeAll, concatAll } from 'rxjs/operators'

const photoList=[
    {
        has_thumbnail:false,
        name:'1.jpg'
    },
    {
        has_thumbnail:true,
        name:'2.jpg'
    },
    {
        has_thumbnail:false,
        name:'3.jpg'
    },
    {
        has_thumbnail:false,
        name:'4.jpg'
    }
]

const has_thumbnail = photoList.filter(photo=>{
    if(photo.has_thumbnail){
        return photo
    }
})
const no_thumbnail = photoList.filter(photo=>{
    if(!photo.has_thumbnail){
        return photo
    }
})
let no_thumbnail_get=[]
let count=0;
no_thumbnail.forEach((photo)=>{
    no_thumbnail_get.push(new Observable(observer=>{
        setTimeout(function(){
            count++
            if(Math.random()*10>5){
                observer.next('get Thumbnail failed',count,no_thumbnail_get.length)
            }else{
                observer.next(photo,count,no_thumbnail_get.length)
            }
         },Math.random()*2000)
    }))
})


 function getThumbnail(path,reject,resolve){
     
     
 }

// const no_thumbnail$=from([]).pipe(merge(...no_thumbnail_get))
const no_thumbnail$=from(no_thumbnail_get).pipe(mergeAll())




no_thumbnail$.subscribe({
    next:(photo,index,len) => {
        console.log('sub:'+(new Date()).getTime())
        
        console.log(x)
        if(count===len){
            console.log('complete')
        }
    },
    error:err=>{
        console.log(err)
    },
    complete:()=>{
        console.log('complete')
    }
})


