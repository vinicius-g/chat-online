const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("pages/index.ejs", {
        page: "home"
    });
});

router.get("/chat", (req, res) => {
    res.render("pages/chat.ejs", {
        page: "chat",
        name: req.query.nome,
        sala: req.query.sala
    })
})

module.exports = router;