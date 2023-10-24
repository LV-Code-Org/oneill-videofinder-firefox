document.addEventListener("DOMContentLoaded", function () {
    const sectionInput = document.getElementById("sectionInput");
    const findButton = document.getElementById("findButton");
    const result = document.getElementById("result");
  
    findButton.addEventListener("click", async function () {
      const section = sectionInput.value;
      if (section) {
        await findYouTubeLink(section)
      }
    });

  
    async function findYouTubeLink(section) {
        const apiKey = "AIzaSyBl0oh4F6_gyoR0VqLb0Ieut-ltfL-F0Ow";
        const videoTitle = `Mrs. O'Neill AP Chemistry Section [${section}] Notes`;
        const channelName = "Mrs. O'Neill";
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${videoTitle}+${channelName}&part=snippet&type=video`;
      
        // Send a GET request to the YouTube API
        fetch(searchUrl)
          .then((response) => response.json())
          .then((data) => {
            // Check if there are search results
            if (data.items && data.items.length > 0) {
              // Get the video ID of the first result
              const videoId = data.items[0].id.videoId;
      
              // Construct the video URL
              const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

              const resultElement = document.getElementById("result");
              resultElement.innerHTML = `<a href="${videoUrl}" target="_blank">Watch Video</a>`;
            } else {
              // No video found for the section
              const resultElement = document.getElementById("result");
              resultElement.textContent = "Video not found for this section.";
            }
          })
          .catch((error) => {
            console.error("Error fetching YouTube data:", error);
            const resultElement = document.getElementById("result");
            resultElement.textContent = "An error occurred while fetching the video.";
          });
      }
      
  });
  