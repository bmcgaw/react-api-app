import React from 'react'
import Typed from 'react-typed';
import axios from 'axios';
import {useState} from 'react';


const Home = () => {


const [data,setData] = useState({});
const [data2,setData2] = useState({})
const [word,setWord] = useState('');

const wordSearchInput = document.getElementById('wordSearchInput');


const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const searchWord = () => {

        axios.get(url).then((response) => {
            setData(response.data);
            console.log(data);
            setWord(response.data[0].word);
            wordSearchInput.value = word;
            return data;
        }).then((data) => {
    
            const getBgPhoto = () => {
                axios.get(`https://pixabay.com/api/?key=30040769-6ee627b58a0448d5e4295dfbd&q=${word}`).then((response) => {
                console.log(response.data.hits[0].largeImageURL);
                setData2(response.data.hits[0].largeImageURL);
            }).catch((e) => {
            console.log(e);
        })
    }
getBgPhoto()
wordSearchInput.value = '';
}).catch((e) => {
    console.log(e);
})};

  return (
    <>
    <div className='w-full h-full'>
        <h1 className='text-green-400 text-[70px] md:text-[110px] text-center mt-5 md:mt-4 transition'>word_search.</h1>
        <p className='text-center text-white text-[25px] md:text-[45px]'>Find the definition of<span className='text-gray-500'>..<Typed strings={['Onomatopoeia','Acquiesce','Enervate','Quotidian','Vociferous']} typeSpeed={60} backSpeed={60} loop></Typed><span/></span></p>
        <div className='w-full h-40 bg-black flex'>
            <div className='m-auto' action="/">
                <input onChange={e => setWord(e.target.value)} id='wordSearchInput' className='w-80 h-10 rounded justify-self-center pl-4 text-xl'type="text" placeholder='find a word definition'/>
                <button type = "submit" onClick={searchWord} id='wordSearchBtn' className='w-[100px] h-10 rounded bg-green-400 ml-4 font-bold text-xl'>Define</button>
            </div>
        </div>
            <div id='wordDiv' className='w-full h-60 bg-green-400 flex border-stone-50'>
               {data[0] ? <div id='wordInfo' style={{backgroundImage: `url(${data2})`}} className='bg-cover bg-center'>

                <div className='absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.75)] rounded-[15px] z-0'></div>

                {data[0] ? <h1 className='absolute mb-[160px] md:mb-[130px] bold' id='wordName'>{data[0].word[0].toUpperCase() + data[0].word.slice(1)}</h1> : null}
                {data[0] ? <p className='z-[999] mt-14 text-xl italic' id='partOfSpeech'>{data[0].meanings[0].partOfSpeech[0].toUpperCase() + data[0].meanings[0].partOfSpeech.slice(1)}</p> : null}
                {data[0] ? <p className='z-[999] mt-5' id='definition'>{data[0].meanings[0].definitions[0].definition}</p> : null}

            </div> : null}
            </div> 
        </div>
    </>
  )
}

export default Home