import express from "express";

const router = express.Router();

let tweets = [
  {
    id: 1,
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

router.get("/", (req, res) => {
  if (req.query === {}) {
    tweets.forEach((tweet) => {
      if (req.query.username === tweet.username) {
        res.json({ tweet });
      }
    });
  } else res.json({ tweets });
});
router.get("/:id", (req, res) => {
  let istrue = false;
  tweets.forEach((tweet) => {
    if (req.params.id === String(tweet.id)) {
      res.json({ tweet });
      istrue = true;
    }
  });
  if (istrue === false) res.json({});
});

router.post("/:id", (req, res) => {
  const tweet = {
    id: Date.now(),
    text: req.body.text,
    createdAt: new Date(),
    name: req.body.name,
    username: req.body.username,
  };
  tweets.push(tweet);
  res.json({ tweets });
});

router.put("/:id", (req, res) => {
  tweets.forEach((tweet) => {
    if (req.params.id === String(tweet.id)) {
      tweet.text = req.body.text;
    }
  });
  res.json({ tweets });
});

router.delete("/:id", (req, res) => {
  let cnt = 0;
  let erase = -1;
  tweets.forEach((tweet) => {
    if (req.params.id === String(tweet.id)) {
      erase = cnt;
    }
    cnt++;
  });
  if (erase == -1) res.json({ tweets });
  else {
    tweets.splice(erase, 1);
    res.json({ tweets });
  }
});

export default router;
