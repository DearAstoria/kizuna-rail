import { getRouteById, getSchedulesByRoute } from '../../models/model.js';

const helper = (route) => {
    const monthDict = {1 : "Jan",
        2 : "Feb", 3 : "March", 4 : "April", 5 : "May", 6 : "June",
        7 : "July", 8 : "August", 9 : "September", 10 : "October",
        11 : "November", 12 : "December"
    };
    // let operatingMonths = [];
    // for (const month in route.operatingMonths){
    //     operatingMonths.push(monthDict[month]);
    // };
    // return operatingMonths;
    return route.operatingMonths.map(month => monthDict[month] || month);
};

export default async (req, res) => {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);
    console.log(details);
    details.operatingMonths = helper(details)
    console.log("AFTERRR", details)

    // TODO: getCompleteRouteDetails instead

    res.render('routes/details', { 
        title: 'Route Details',
        details
    });
};