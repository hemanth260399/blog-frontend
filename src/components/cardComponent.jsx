export let BlogCard = ({ item }) => {
    return (
        <>
            <div className="w-[120vh] mt-10 flex justify-center flex-wrap text-center bg-white border flex border-gray-200 rounded-lg shadow-sm sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                <img className="object-fit rounded-t-lg h-[70vh] w-[100%] md:rounded-none md:rounded-s-lg" loading="lazy" src={item.image ? item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MWexleZNIRsosTMMYHPOTAd8uqq4QTiv2A&s"} alt="" />
                <div className="flex flex-col justify-between mx-5 w-[100%] mt-5 leading-normal">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h4>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Category : {item.category}</h5>
                    <p className="mb-3 flex font-normal text-gray-700 dark:text-gray-400">{item.content}</p>
                    <p className="text-end font-bold">Author by-{item.userId.email ? item.userId.name : ""}</p>
                </div>
            </div>
        </>
    )
}