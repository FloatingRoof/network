import React, {useEffect, useState} from 'react';
import classes from "./Paginator.module.css";
import cn from "classnames"



let Paginator = ({portionSize=10, ...props}) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPositionPageNumber = (portionNumber - 1) * portionSize+1;
    let rightPositionPageNumber = portionNumber*portionSize;

    useEffect(()=>setPortionNumber(Math.ceil(props.currentPage/portionSize)), [props.currentPage]);
    return (
        <div>
            {portionNumber>1 &&
            <>
                <button onClick={()=>{setPortionNumber(1);}}>To the beginning</button>
                <button onClick={()=>{setPortionNumber(portionNumber-1);}}>Pr</button>

            </>
            }
            {pages.filter(p => p>=leftPositionPageNumber && p<= rightPositionPageNumber)

                .map(p =>
                    <span key={p} className={cn({[classes.selectedPage]: props.currentPage === p })}
                          onClick={() => {
                              props.onPageChanged(p)
                          }}> {p}</span>)}
            {portionCount>portionNumber &&
            <>
                <button onClick={()=>{setPortionNumber(portionNumber+1);}}>Next</button>
                <button onClick={()=>{setPortionNumber(portionCount);}}>To the end</button>
            </>
            }
        </div>

    );
}

export default Paginator;