// const express = require("express");
// const { videoDetails, videos } = require("../model/jobs");
// // const { JsonWebTokenError } = require("jsonwebtoken");

// const jwt = require("jsonwebtoken");


// const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");

// // const jwtAuth = require("../middleware/jwtAuth");
// const jwtAuth = require("../middleware/jwtAuth");

// const router = express.Router(); // to handle the routes in node js

// router.get("/", (req, res) => {
//     res.send("This is  API Routes Page")
// })


// // all jobs

// // router.get("/jobs", async(req,res)=>{
// // router.get("/videos", jwtAuth, async (req, res) => {
// //     const allVideos = await videos.find({}); //fetch all jobs from jobs schema
// //     res.json({ videos: allVideos })
// // })


// // Route to fetch all videos
// router.get('/videos', async (req, res) => {
//     try {
//       const allVideos = await videos.find(); // Retrieve all videos from the database
//       res.json(allVideos);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Route to fetch trending videos
//   router.get('/videos/trending', async (req, res) => {
//     try {
//       const trendingVideos = await videos.find({ category: 'Trending' }); // Filter videos by category
//       res.json(trendingVideos);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Route to fetch game videos
//   router.get('/videos/game', async (req, res) => {
//     try {
//       const gameVideos = await videos.find({ category: 'Game' }); // Filter videos by category
//       res.json(gameVideos);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
//   // router.get("/jobs/:id",  async (req, res) => {
//     router.get("/videos/:id", jwtAuth, async (req, res) => {
//         const { id } = req.params;
//         const video = await videoDetails.findOne({ _id: id });
//         if (!video) {
//             return res.json({ message: "video not found" })
//         }
//         // console.log(job)
    
//         const videotitle = video.title
    
//         const similarVideo = await videos.find({
//             title: { $regex: videotitle, $options: 'i' },
//             _id: { $ne: id }
//         })
    
//         res.status(200).json({ videoDetails: video, similarVideo: similarVideo })
//     })

//     // filters api
//     router.get("/filtervideos", jwtAuth, async (req, res) => {
//         try {
//             const { search } = req.query;
//             const query = {};
    
//             if (search) {
//                 query.title = { $regex: search, $options: "i" };
//             }
    
//             const filterVideos = await videos.find(query);
//             if (filterVideos.length === 0) {
//                 return res.status(404).json({ message: "no Videos found" });
//             }
//             return res.json(filterVideos);
//         } catch (e) {
//             console.log(e);
//             return res.json({ message: "internal server error" });
//         }
//     });


// module.exports = router; 


const express = require("express");
const { videoDetails, videos } = require("../model/jobs");
const jwtAuth = require("../middleware/jwtAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router(); // to handle the routes in node js



router.get("/", jwtAuth, async (req, res) => {
    const allVideos = await videoDetails.find({});
    res.json({ Videos: allVideos });
});

router.get("/videos", jwtAuth, async (req, res) => {
    try {
        const { search } = req.query;
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const filterVideos = await videos.find(query);
        if (filterVideos.length === 0) {
            return res.status(404).json({ message: "no Videos found" });
        }
        return res.json(filterVideos);
    } catch (e) {
        console.log(e);
        return res.json({ message: "internal server error" });
    }
});
  // Route to fetch trending videos
  router.get('/videos/trending', async (req, res) => {
    try {
      const trendingVideos = await videos.find({ category: 'Trending' }); // Filter videos by category
      res.json(trendingVideos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Route to fetch game videos
  router.get('/videos/game', async (req, res) => {
    try {
      const gameVideos = await videos.find({ category: 'Game' }); // Filter videos by category
      res.json(gameVideos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.get("/videos/category", jwtAuth, async (req, res) => {
    const { category } = req.params;
    const videocategory = await videoDetails.findOne({ category: category });

    if (!videocategory || videocategory.length === 0) {
        return res.json({ message: "No videos found in the specified category" });
    }

    res.status(200).json({ videocategory: videocategory });
});

router.get("/videos/:id", jwtAuth, async (req, res) => {
    const { id } = req.params;
    const video = await videoDetails.findOne({ _id: id });
    if (!video) {
        return res.json({ message: "video not found" });
    }
    res.status(200).json({ videoDetails: video });
    console.log(video );
});






module.exports = router;