export const getChatPage = (req, res) => {
    res.render('chat', { messages: [], currentUser: "scoobydoo" });
};

export default {
    getChatPage
};