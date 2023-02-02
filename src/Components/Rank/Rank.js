import React from "react";

const Rank = ({name, entries}) => {
    return(
        <div>
            <div className="white f3 tc">
                {`${name}, Your current rank is ...`}
            </div>
            <div className="white f1 tc">
                {entries}
            </div>
        </div>
    )
}

export default Rank;