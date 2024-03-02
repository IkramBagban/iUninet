import React from 'react'

const Button = ({ onClick, buttonClasses, buttonTitle }) => {
    return (
        <>
            <div className="flex justify-center">
                <button onClick={onClick}
                    className={`mt-10  w-[19rem] h-[4.8rem] rounded-[30px] text-center text-[32px] font-semibold transition duration-300 ${buttonClasses}`}
                >
                    {/* <a href="/login"> */}
                    {buttonTitle}
                    {/* </button> </a> */}

                </button>
            </div>
        </>
    )
}

export default Button