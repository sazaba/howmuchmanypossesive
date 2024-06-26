
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.webp';
import fblank from './assets/fblank.webp';
import errorid from './assets/errorid.webp';
import completion from './assets/completion.webp';
import reading from './assets/reading.webp';
import acomprehension from './assets/acomprehension.webp';
import julie from './assets/julie.mp3'

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        handleRetry();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate('/timeout');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setSubmitted(false);
    };

    const handleInputChange = (category, questionId, event) => {
        const { value } = event.target;
        handleAnswer(category, questionId, value);
    };


    const [questions, setQuestions] = useState({
        multipleChoice: [
            {
                "id": 1,
                "question": "___ apples are there in the basket?",
                "options": ["How much", "How many"],
                "answer": ["How many"],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "___ sugar do you need for the recipe?",
                "options": ["How much", "How many"],
                "answer": ["How much"],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "___ cat is very playful.",
                "options": ["My", "Your", "His/Her/Its", "Our", "Your", "Their"],
                "answer": ["My"],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "___ house needs some repairs.",
                "options": ["My", "Your", "His/Her/Its", "Our", "Your", "Their"],
                "answer": ["Our"],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "___ chairs are there in the dining room?",
                "options": ["How much", "How many"],
                "answer": ["How many"],
                "selectedOption": null
            }
        ]


        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "She asked ___ it would cost to repair the car.",
                "options": [],
                "answer": ["how much", "How much", "HOW MUCH"],
                "selectedOption": null
            },
            {
                "id": 7,
                "question": "___ children do you have?",
                "options": [],
                "answer": ["How many", "how many", "HOW MANY"],
                "selectedOption": null
            },
            {
                "id": 8,
                "question": "He lost ___ keys yesterday.",
                "options": [],
                "answer": ["his", "His", "HIS"],
                "selectedOption": null
            },
            {
                "id": 9,
                "question": "___ mother cooks delicious meals.",
                "options": [],
                "answer": ["My", "my", "MY"],
                "selectedOption": null
            },
            {
                "id": 10,
                "question": "They are going to visit ___ relatives next weekend.",
                "options": [],
                "answer": ["their", "Their", "THEIR"],
                "selectedOption": null
            }
        ]



        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "How much brothers do you have?",
                "options": ["How much", "How many", "No error"],
                "answer": ["How many"],
                "selectedOption": null
            },
            {
                "id": 12,
                "question": "How many time did it take to finish the project?",
                "options": ["How much", "How many", "No error"],
                "answer": ["How much"],
                "selectedOption": null
            },
            {
                "id": 13,
                "question": "Her favorite color is blue.",
                "options": ["My", "Your", "His/Her/Its", "Our", "Your", "Their", "No error"],
                "answer": ["No error"],
                "selectedOption": null
            },
            {
                "id": 14,
                "question": "Our going to the movies tonight.",
                "options": ["My", "Your", "His/Her/Its", "Our", "Your", "Their", "No error"],
                "answer": ["We're"],
                "selectedOption": null
            },
            {
                "id": 15,
                "question": "His dog likes to play fetch.",
                "options": ["My", "Your", "His/Her/Its", "Our", "Your", "Their", "No error"],
                "answer": ["No error"],
                "selectedOption": null
            }
        ]


        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "___ dog is very friendly.",
                "options": [],
                "answer": ["My", "my", "MY"],
                "selectedOption": null
            },
            {
                "id": 17,
                "question": "___ sister is a teacher.",
                "options": [],
                "answer": ["My", "my", "MY"],
                "selectedOption": null
            },
            {
                "id": 18,
                "question": "She asked ___ money do you need for the trip.",
                "options": [],
                "answer": ["How much", "How many", "No error"],
                "selectedOption": null
            },
            {
                "id": 19,
                "question": "___ car is parked outside.",
                "options": [],
                "answer": ["My", "my", "MY"],
                "selectedOption": null
            },
            {
                "id": 20,
                "question": "___ friends are coming to visit next week.",
                "options": [],
                "answer": ["My", "my", "MY"],
                "selectedOption": null
            }
        ]
        ,
        paragraphInterpretation: [
            {
                "id": 1,
                "question": "How did the narrator and their friends prepare for their day at the beach?",
                "options": [
                    "They packed beach towels, sunscreen, and snacks.",
                    "They brought books to read.",
                    "They rented surfboards.",
                    "They forgot their sunscreen."
                ],
                "answer": ["They packed beach towels, sunscreen, and snacks."],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "What activities did the group enjoy at the beach?",
                "options": [
                    "Swimming, playing beach volleyball, and having a picnic.",
                    "Building sandcastles and flying kites.",
                    "Sailing and fishing in the sea.",
                    "Sunbathing and napping."
                ],
                "answer": ["Swimming, playing beach volleyball, and having a picnic."],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "What did the narrator do during the afternoon at the beach?",
                "options": [
                    "Took a long walk along the shore and collected seashells.",
                    "Went back home to rest.",
                    "Played beach games with friends.",
                    "Had a barbecue by the sea."
                ],
                "answer": ["Took a long walk along the shore and collected seashells."],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "How did the narrator describe the weather during their day at the beach?",
                "options": [
                    "Perfect—sunny with a gentle breeze.",
                    "Cloudy with occasional rain showers.",
                    "Windy and cold.",
                    "Foggy and humid."
                ],
                "answer": ["Perfect—sunny with a gentle breeze."],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "How did the day end for the narrator and their friends?",
                "options": [
                    "They watched the sunset before packing up and heading home.",
                    "They stayed overnight at the beach.",
                    "They went to a beach party.",
                    "They explored a nearby forest."
                ],
                "answer": ["They watched the sunset before packing up and heading home."],
                "selectedOption": null
            }
        ]

        ,

        // audioComprehension: [
        //     {
        //         id: 100,
        //         question: " What is Julie's favorite color?",
        //         options: ["Blue", "Green"],
        //         answer: "Blue",
        //         selectedOption: null,
        //         audio: julie
        //     },
        // ],
    });



    const handleAnswer = (category, questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = {
            ...questions,
            [category]: questions[category].map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedOption };
                }
                if (question.questions) {
                    return {
                        ...question,
                        questions: question.questions.map(subQuestion => {
                            if (subQuestion.id === questionId) {
                                return { ...subQuestion, selectedOption };
                            }
                            return subQuestion;
                        }),
                    };
                }
                return question;
            }),
        };
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        Object.values(questions).flat().forEach(question => {
            const isCorrect = Array.isArray(question.answer)
                ? question.answer.includes(answers[question.id])
                : question.answer === answers[question.id];

            if (isCorrect) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };

    const renderQuestions = (category, questions) => (
        <div className='category-container'>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2 py-5'>{question.question}</p>
                        </>
                    )}
                    {question.video && (
                        <div className="relative">
                            <YouTube
                                videoId="cVsyJvxX48A"
                                className="mx-auto w-full"
                                opts={{ width: '100%' }}
                            />
                            <p className="mb-2 py-5">{question.question}</p>
                        </div>
                    )}
                    {!question.audio && !question.video && (
                        <>
                            <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
                            <p className=' mb-2 px-3'>{question.question}</p>
                        </>
                    )}

                    {!question.questions && (
                        <div className='flex flex-wrap justify-center'>
                            {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                <input
                                    type="text"
                                    className='py-2 px-4 border-b-2 border-slangup focus:outline-none focus:border-b-2 focus:border-slangup'
                                    value={question.selectedOption || ''}
                                    onChange={(e) => handleInputChange(category, question.id, e)}
                                    disabled={submitted}
                                />
                            ) : (
                                question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-5 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                        onClick={() => handleAnswer(category, question.id, option)}
                                        disabled={submitted}
                                        style={{ width: question.options.length > 2 ? '80%' : '50%' }}
                                    >
                                        {option}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                    {question.questions && question.questions.map(subQuestion => (
                        <div className='my-10' key={subQuestion.id}>
                            <p className='px-7'>{subQuestion.question}</p>
                            <div className='flex flex-wrap justify-center'>
                                {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                    <input
                                        type="text"
                                        className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                        value={subQuestion.selectedOption || ''}
                                        onChange={(e) => handleInputChange(category, subQuestion.id, e)}
                                        disabled={submitted}
                                    />
                                ) : (
                                    subQuestion.options.map(option => (
                                        <button
                                            key={option}
                                            className={`py-1 px-5 rounded ${subQuestion.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                            onClick={() => handleAnswer(category, subQuestion.id, option)}
                                            disabled={submitted}
                                            style={{ width: subQuestion.options.length > 2 ? '80%' : '50%' }}
                                        >
                                            {option}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img className='w-[150px]' src={mchoice} alt='' />
            </div>
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill In The Blank</h2>
                <img className='w-[150px]' src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>What's The Error?</h2>
                <img className='w-[150px]' src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Complete The Sentence</h2>
                <img className='w-[150px]' src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img className='w-[150px]' src={reading} alt='' />
            </div>
            <div className='pt-7 flex flex-col items-center'>
                <h2>A Day at the Beach</h2>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>
                    Last summer, my friends and I decided to spend a day at the beach. We woke up early in the morning, packed our beach towels, sunscreen, and some snacks, and headed to the coast. The weather was perfect—sunny with a gentle breeze. When we arrived, we spread our towels on the warm sand and lay down to enjoy the peaceful atmosphere.

                    Some of us went for a swim in the refreshing sea while others played beach volleyball. Around noon, we had a picnic under a large umbrella, sharing sandwiches and laughter. After lunch, I decided to take a long walk along the shore, collecting seashells and enjoying the sound of the waves.

                    As the day progressed, more people arrived at the beach, creating a lively atmosphere. We stayed until late afternoon, watching the beautiful sunset before packing up our things and heading home, tired but happy after a wonderful day by the sea.</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            {/* <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)} */}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
