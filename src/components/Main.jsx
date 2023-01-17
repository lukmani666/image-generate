import React from 'react'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './main.css'
import './spinner/spinner.css'

const Main = () => {

    const [ prompt, setPrompt ] = useState("");
    const [ result, setResult ] = useState("");
    const [ generate, setGenerate] = useState(false);
    const [ display, setDisplay ] = useState(false);
   
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);


    const generateImage = async () => {

    
        try {
            setDisplay(true)
            setGenerate(true);
            const res = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "256x256",
            });

            setResult(res.data.data[0].url);
            setGenerate(false);
            setDisplay(false);
        } catch (error) {
            setDisplay(false);
            setGenerate(false);
        }

    };

    return (

        <div>
            <nav className="navbar">
                <div className='txt'>
                    <h2 className="navtxt">Open AI Image
                        <span className='spantxt'>Generator</span>
                    </h2>
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
                    <button onClick={generateImage} className='btn' disabled={generate}>
                        {generate ? <>Generating...</> : <>Generate an Image</>}
                    </button>
                    
                </div>
            </section>
            <main>
                <div className='img_container'>
                    <div>
                    <h2 className="msg"></h2>
                    {result.length > 0 ? (<LazyLoadImage src={result} alt="result"
                         placeholderSrc={result} effect="blur" />)
                    : (
                        <></>
                    )}
                </div>
            </div>
            </main>
           {display && <div className="loading"></div>}
            
        </div>
    )
}

export default Main