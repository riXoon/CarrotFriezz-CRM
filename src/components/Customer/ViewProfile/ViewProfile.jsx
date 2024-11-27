import { useState } from "react";
import coverPhoto from '../../../assets/cover-photo.jpg'
import avatar2 from '../../../assets/avatar2.png';
import NavBar from "../Customer/NavBar";

const ViewProfile = () => {
  const [activeTab, setActiveTab] = useState("Likes");

  const likes = [
    {
      name: "Zsuper Mini",
      rating: "4.9",
      review:
        "Carrot Friezz's buy 1 take 2 something something priced at ₱59.00 only!",
    },
    {
      name: "Zsuper Mini",
      rating: "4.9",
      review:
        "Carrot Friezz's buy 1 take 2 something something priced at ₱59.00 only!",
    },
  ];

  const reviews = [
    {
      name: "Jane Doe",
      rating: "5",
      review:
        "Lorem ipsum sorad Madeleine Engström. Du kan vara drabbad. Krofask nystartsjobb det vill säga vinde...",
    },
  ];

  return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-50">
            <header className="bg-gradient-to-r from-orange-400 to-green-500 h-[350px] relative">
                <img
                src={coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover" // Ensures the image takes up the full width and height
                />
                <div className="absolute inset-0 flex justify-center items-center">
                <div className="mt-[20rem] bg-orange-500 w-52 h-52 rounded-full flex items-center justify-center">
                    <img src={avatar2} className="w-[11rem]" />
                </div>
                </div>
            </header>

            <div className="text-center mt-24">
                <h1 className="text-3xl font-bold text-green-800">FirstName LastName</h1>
            </div>

            <div className="mt-8 mx-auto max-w-4xl">
                <div className="flex justify-center border-b border-gray-300">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === "Likes" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"}`}
                    onClick={() => setActiveTab("Likes")}
                    >
                    Likes
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === "Reviews" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"}`}
                    onClick={() => setActiveTab("Reviews")}
                    >
                    Reviews
                </button>
                </div>

                <div className="mt-6 space-y-4"> {/* Added space-y-4 to add spacing between elements */}
                {activeTab === "Likes" &&
                    likes.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-sm mb-4 bg-white">
                        <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-800">{item.name}</h2>
                        <span className="text-orange-500 font-bold">{item.rating}★</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{item.review}</p>
                        <div className="flex justify-end mt-2">
                        <button>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    ))}
                {activeTab === "Reviews" &&
                    reviews.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm mb-4 bg-white">
                        <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-800">{item.name}</h2>
                        <span className="text-orange-500 font-bold">{item.rating}★</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{item.review}</p>
                    </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
  );
};

export default ViewProfile;
