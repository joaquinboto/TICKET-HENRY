const { Users , Cart , Event , ReviewScore} = require("../db");
const { Op } = require('sequelize');




const adminPut = async (req, res) => {
    const { idUser, idAdmin } = req.query
    const {status} = req.body

    const mStatus = status.charAt(0).toUpperCase() + status.slice(1);

    try {

        const validation = await Users.findOne({
            where: {
                id: idAdmin
            }
        })

        if (validation.status !== 'Admin') return res.json("You are not an admin")
       
        await Users.update({
            status: mStatus
        }, { where: { id: idUser } })

        const user = await Users.findOne({
            where: {
                id: idUser
            }
        })
        res.send(`${user.username} is now ${user.status}`)
    } catch (error) {
        console.log(error)
    }
}

const bannedUser = async (req, res)=>{
	const {id} = req.params;

	try {
		if(!id)	res.status(404).json({message: 'id is require..'});
		else{
			let userBanned = await Users.findOne({
				where: {
					id
				},
				include: {
					model: Event,
				  }
				});
			
			if(!userBanned) res.status(404).json({message: 'user not found..'});
			else{
				await Users.update({status: 'Banned'},{where: {id}});
				await Event.update({isActive: false},{ where: {userId: id}})
			
				await ReviewScore.destroy({where:{userId:id}})
				const nuevo = await Users.findAll()
				res.status(200).json(nuevo);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

const hideEvent = async (req, res, next) => {
	let { eventId } = req.body;
	try {
		let eventToHide = await Event.findOne({
			where: {
				id: eventId,
			},
		});
		if (bookToHide) {
			await eventToHide.update({
				stock: 0,
			});
			res.status(200).send(`${eventToHide.title} has been hidden!`);
		} else {
			res.status(400).send('No book was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const showEvent = async (req, res, next) => {
	let { eventId , stock } = req.body;
	try {
		let eventToShow = await Event.findOne({
			where: {
				id: eventId,
			},
		});
		if (eventToShow) {
			await eventToShow.update({
				stock: stock,
			});
			res.status(200).send(`${eventToShow.title} is now shown!`);
		} else {
			res.status(400).send('No book was found with that id');
		}
	} catch (err) {
		next(err);
	}
};
// Update to joaco , hay que revisar  si anda bien
const getAllOrders = async (req, res, next) => {
	try {
		let allOrders = await Cart.findAll({
			where: {
				status: {
					[Op.not]: 'Active',
				},
			},
			include: {
				model: Event,
			},
		});
		res.json(allOrders);
	} catch (err) {
		next(err);
	}
};

const unbanUser = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToUnban = await Users.findOne({
			where: {
				id: userId,
			},
		});
		if (userToUnban) {
			await userToUnban.update({
				status: 'User',
			});
			await Event.update({isActive: true},{ where: {userId: userId}})
			const nuevo = await Users.findAll()
				res.status(200).json(nuevo);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const upgradeToAdmin = async (req, res, next) => {
	let { userId } = req.body;

	try {
		let userToAdmin = await Users.findOne({
			where: {
				id: userId,
			},
		});
		if (userToAdmin) {
			await userToAdmin.update({
				status: 'Admin',
			});
			const nuevo = await Users.findAll()
				res.status(200).json(nuevo);;
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const upgradeToUser = async (req, res, next) => {
	let { userId } = req.body;

	try {
		let userToUser = await Users.findOne({
			where: {
				id: userId,
			},
		});
		if (userToUser) {
			await userToUser.update({
				status: 'User',
			});
			const nuevo = await Users.findAll()
				res.status(200).json(nuevo);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const deleteCommentToAdmin = async (req, res, next) => {
	let { reviewId } = req.body;
	try {
		await ReviewScore.destroy({
			where: {
				id: reviewId,
			},
		});
		res.send(`Comment has been deleted`);
	} catch (err) {
		next(err);
	}
};

module.exports = {
    adminPut,
	bannedUser,
	deleteCommentToAdmin,
	upgradeToAdmin,
	unbanUser,
	getAllOrders,
	showEvent,
	hideEvent,
	upgradeToUser
};