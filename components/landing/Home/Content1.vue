<template>
    <div class="text-3xl w-full h-screen bg-custom-1">
      <div class="flex w-full h-1/2">
        <div class="w-1/3 h-1/2">
          <div class="flex h-full justify-center items-center">
            <img
              src="../../../public/images/background/cubes.png"
              class="lg:w-20 w-16"
              alt="cubes"
            />
          </div>
          <div class="flex w-full h-auto justify-end">
            <img
              src="../../../public/images/background/news.png"
              class="lg:w-20 w-16"
              alt="news"
            />
          </div>
        </div>
        <div class="w-full flex flex-col items-center">
          <span class="lg:text-5xl text-2xl font-bold text-center font-poppins">
            Leading Actual News
          </span>
          <span
            class="lg:text-5xl text-2xl p-2 font-bold text-center font-poppins"
          >
            and upholding the truth with
          </span>
          <span
            class="lg:text-5xl text-2xl p-2 font-bold text-center font-poppins"
          >
            Cutting-Edge Technology
          </span>
          <div class="w-full lg:p-10 p-5">
              <div
                class="flex lg:w-full md:w-auto items-center bg-gray-200 rounded-full px-4 py-2 shadow-lg"
              >
                <svg
                  class="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search News"
                  class="bg-transparent text-base w-full text-gray-500 focus:outline-none ml-2"
                />
              </div>
          </div>
        </div>
        <div class="w-1/3 h-1/2">
          <div class="flex h-full justify-center items-center">
            <img
              src="../../../public/images/background/hand.png"
              class="lg:w-20 w-16"
              alt="cubes"
            />
          </div>
          <div class="flex w-full h-auto justify-start">
            <img
              src="../../../public/images/background/neural.png"
              class="lg:w-20 w-16"
              alt="news"
            />
          </div>
        </div>
      </div>
      <div class="w-full h-1/2 bg-[#C0244F] lg:flex">
        <div class="lg:w-3/4 w-full flex items-center justify-center">
            <span class="font-poppins font-bold text-5xl text-white">
                About Us
            </span>
        </div>
        <div class="w-full p-16">
            <span class="font-poppins font-bold text-lg text-white">
                Hoax Chaser
            </span>
            <span class="font-poppins text-lg text-white">
                is an app that lets you explore the reality of information, where artificial intelligence and advanced technology combine to uncover the world of hoaxes. We bring trusted solutions to ensure you always get accurate news, helping you to face the challenge of false information that fits our slogan.
            </span>
        </div>
      </div>
    </div>
</template>
<style scoped>
.bg-custom-1 {
  background-image: url("../../../public/images/background/lines.png");
  background-repeat: no-repeat;
  background-size: 60% 100%;
  background-position: left;
}
@media (max-width: 640px) {
  .bg-custom-1 {
    background-size: 100% 100%; /* Ukuran background menjadi 100% untuk tampilan mobile */
  }
}
</style>