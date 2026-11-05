import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    let routes = "";
    const filterByRegion = req.query.region || 'all';
    if (filterByRegion != 'all'){ // Pretty sure getRoutesByRegion func
        routes = await getRoutesByRegion(filterByRegion); // Does the err
    } else {// checking for us yo!
        routes = await getAllRoutes();
    };
    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};