import React from 'react'
import Button from './Button'

const AuthRightSection = ({ heading, content, buttonColor, buttonTitle, onButtonClick }) => {
    return (
        <div className="md:w-[50%] h-screen bg-gradient-to-r from-[#3FAAA8F2] to-[#39B792] flex justify-center">
            <div className="w-[498px] h-screen grid place-content-center">
                <div className="text-center text-white font-bold text-[4rem]">
                    {heading}
                </div>

                <div className="text-center text-white font-medium text-[1.5rem]">
                    {content}
                </div>

                <div className="flex justify-center">
                    <Button
                        buttonTitle={buttonTitle}
                        onClick={onButtonClick}
                        buttonClasses="bg-white text-teal-600 hover:text-white hover:bg-teal-600" />
                </div>
            </div>
        </div>
    )
}

export default AuthRightSection