const User = require('../models/User');
const Post = require('../models/Post');
const { faker } = require('@faker-js/faker');

const runSeed = async (req, res) => {
    const count = req.params.qty
    const imageGeneratorURL = 'https://picsum.photos/200'
    try {
        await User.deleteMany();
        await Post.deleteMany();
        for (let i = 0; i < count; i++) {
            const profilePictureGeneratorURL = 'https://robohash.org/' + faker.animal.dog() + '.png'
            const user = await User.create({
                username: faker.internet.userName(),
                description: faker.lorem.sentence(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                profilePicture: profilePictureGeneratorURL,
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
        const prueba = await User.create({
            username: 'prueba',
            email: 'prueba@prueba.com',
            description: faker.lorem.sentence(),
            password: 'prueba',
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS65DGqFvGzIj8YQEifkpvsvBFHl8qsLm-hyA&s'

        })
        const imgQty = Math.floor(Math.random() * 40) + 1;
            for (let j = 0; j < imgQty; j++) {
                const img = await fetch(imageGeneratorURL)
                const post = {
                    user: prueba._id,
                    imageUrl: img.url,
                    caption: faker.lorem.sentence(),
                }
                await Post.create(post);
            }

        res.status(201).json({ message: 'Seed data created successfully' });
    } catch
    (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { runSeed };