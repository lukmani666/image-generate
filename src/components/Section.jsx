import React from 'react'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './section.css'

const Section = () => {

    const [ prompt, setPrompt ] = useState("");
    const [ result, setResult ] = useState("");

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);


    const generateImage = async () => {
        const res = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '512x512',
        });

        setResult(res.data.data[0].url);

    };


    return (

        <div>
            <nav className="navbar">
                <div>
                    <h2 className="navtxt">Open AI Image
                    <span className='spantxt'>Generator</span></h2>
                </div>
            </nav>
            <section className="top">
                <div>
                    <h2 className="top_txt">Describe An Image</h2>
                    <form action="">
                        <div className='input'>
                            <input onChange={(e) => 
                                setPrompt(e.target.value)}
                                type="text" placeholder='Enter Text' 
                            />
                        </div>
                        <select name="size" id="size">
                            <option value="small">Small</option>
                            <option value="medium" selected>Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </form>
                </div>
                <div>
                    <button onClick={generateImage} className='btn'>
                       Generate an Image
                    </button>
                    
                </div>
            </section>
            <main>
                <div className='img_container'>
                    <div>
                    <h2 className="msg">The beau image</h2>
                    {result.length > 0 ? (<img src={result} alt="result" />)
                    : (
                        <></>
                    )}
                </div>
            </div>
            </main>
        </div>
    )
}

export default Section