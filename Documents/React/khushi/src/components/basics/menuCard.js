import React from 'react'

const menuCard = ({menuData}) => {
    return (
        <div>
            <section className="main-card--cointainer">
                {menuData.map((curElem) => {
                    const { id,name,category,image,description }= curElem
                    return (
                        <>
             <div className="card-container" key={id}>
               <div className="card">
                   <div className="card-body">
                       <span className="card-number">{id}</span>
                       <span className="card-author subtle">{category}</span>
                       <h2 className="card-tittle">{name}</h2>
                       <span className="card-description subtle">
                           {description}
                       </span>
                       <div className="card-read">Read</div>

                   </div>
                   <img src={image} alt="images" className="card-media" />
                   <span className="card-tag subtle">Order now</span>
               </div>
           </div>
           </>
                     ) })}
                     </section>

          
        </div>
    )
}

export default menuCard
