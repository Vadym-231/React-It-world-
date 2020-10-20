import React from "react";
import {Link} from "react-router-dom";



function CreateRow({comments_block,comments,styleModule,title,imgSrc_,date,idNews,content=null}){
    return(
        <figure style={(content!==null&&content.length<8030)?{height:'1500px'}:{}} className={styleModule.blockFigura}>
            <img className={styleModule.blockImg} src={imgSrc_} alt={idNews}/>
            <figcaption>
                <h1 className={styleModule.blockTitle}>{title}</h1>
                {(content!==null)?<span className={styleModule.content}>{content}</span>:null}
                <span className={styleModule.blockDate}>{(comments!=='0')?"Comments:"+comments+" "+date:date}</span>
                <div>{comments_block}</div>
            </figcaption>
        </figure>
    )
}
function CheckType ({comments_block=null,comments='0',styleModule,title,imgSrc_,date,idNews,content=null}){
    if(content===null){
        return (<Link to={"/block/"+idNews}>
                <CreateRow comments_block={comments_block}  comments={comments} styleModule={styleModule} title={title} idNews={idNews} date={date} imgSrc_={imgSrc_} />
            </Link>
        )
    }
    else {
        return <CreateRow comments_block={comments_block} comments={comments} styleModule={styleModule} title={title} content={content} date={date} idNews={idNews} imgSrc_={imgSrc_}/>
    }
}
export default CheckType;