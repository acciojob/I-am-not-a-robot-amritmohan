//your code here

const imageUrls = [
            "https://picsum.photos/id/237/200/300",
            "https://picsum.photos/seed/picsum/200/300",
            "https://picsum.photos/200/300?grayscale",
            "https://picsum.photos/200/300",
            "https://picsum.photos/200/300.jpg"
        ];
        
        let selectedImages = [];
        let shuffledImages = [];

        function startGame() {
            document.getElementById("para").innerText = "";
            document.getElementById("verify").style.display = "none";
            document.getElementById("reset").style.display = "none";
            selectedImages = [];
            generateImages();
        }

        function generateImages() {
            let container = document.getElementById("image-container");
            container.innerHTML = "";
            
            let duplicateIndex = Math.floor(Math.random() * 5);
            shuffledImages = [...imageUrls];
            shuffledImages.push(imageUrls[duplicateIndex]);
            shuffledImages.sort(() => Math.random() - 0.5);

            shuffledImages.forEach((src, index) => {
                let img = document.createElement("img");
                img.src = src;
                img.setAttribute("data-index", index);
                img.onclick = () => selectImage(img);
                container.appendChild(img);
            });
        }

        function selectImage(img) {
            if (selectedImages.length < 2 && !img.classList.contains("selected")) {
                img.classList.add("selected");
                selectedImages.push(img);
            }
            
            if (selectedImages.length > 0) {
                document.getElementById("reset").style.display = "inline-block";
            }
            
            if (selectedImages.length === 2) {
                document.getElementById("verify").style.display = "inline-block";
            }
        }

        function resetGame() {
            document.getElementById("para").innerText = "";
            document.getElementById("verify").style.display = "none";
            document.getElementById("reset").style.display = "none";
            selectedImages.forEach(img => img.classList.remove("selected"));
            selectedImages = [];
        }

        function verifySelection() {
            document.getElementById("verify").style.display = "none";
            if (selectedImages[0].src === selectedImages[1].src) {
                document.getElementById("para").innerText = "You are a human. Congratulations!";
            } else {
                document.getElementById("para").innerText = "We can't verify you as a human. You selected non-identical tiles.";
            }
        }

        startGame();