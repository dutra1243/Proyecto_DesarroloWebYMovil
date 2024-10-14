const User = require('../models/User');
const Post = require('../models/Post');
const {faker} = require('@faker-js/faker');

const runSeed = async (req, res) => {
    const count = req.params.qty
    const imageGeneratorURL = 'https://picsum.photos/200'
    try {
        await User.deleteMany();
        await Post.deleteMany();
        for (let i = 0; i < count; i++) {
            const user = await User.create({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            })

            const imgQty = Math.floor(Math.random() * 20) + 1;
            for (let j = 0; j < imgQty; j++) {
                const img = await fetch(imageGeneratorURL)
                const post = {
                    user: user._id,
                    imageUrl: img.url,
                    caption: faker.lorem.sentence(),
                }
                await Post.create(post);
            }
        }
        // res.status(201).json({message: 'Seed data created successfully'});
        res.status(201).json({message: 'Seed data created successfully'});
    } catch
        (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {runSeed};