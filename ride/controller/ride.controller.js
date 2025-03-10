const rideModel = require("../models/ride.model")

module.exports.createRide = async(req,res,next) => {
    const {pickup , destination} = req.body;

    const newRide = new rideModel({
        user:req.user._id,
        pickup,
        destination
    })

    await newRide.save()
    res.send(newRide);
}

module.exports.acceptRide = async (req, res, next) => {
    const {rideId} = req.query
    const ride = await rideModel.findById(rideId)
    if(!ride){
        return res.status(404).send({message: "Ride not found"})
    }
    ride.status= 'accepted';
    await ride.save()
    res.send(ride)
}