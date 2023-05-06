function ChatPrompt({ onPrompt }) {
    const [inputValue, setInputValue] = useState('');


    async function handleSubmit() {


    };



    return (
        <div className="fixed bottom-4 right-0 left-0 p-4 flex flex-col items-center" overflow="hidden">

            <div className="max-w-m w-full bg-gray-50 shadow-md  rounded-md overflow-hidden">

                <div className="p-4">


                    <input
                        type="text"

                        value={inputValue}
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    <div className='flex'>
                        <div className='flex-item'>
                            <button

                                className="mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md"

                                onClick={() => {
                                    handleSubmit()

                                }}>
                                <SendIcon />
                            </button></div>


                    </div>

                </div>
            </div></div>

    );
};