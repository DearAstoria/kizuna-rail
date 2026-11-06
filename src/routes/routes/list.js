import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    let routes = ""; // Did this because we needed to change the routes more than once dep on # of filters.
    const filterByRegion = req.query.region || 'all';
    const filterBySeason = req.query.season || 'all';
    if (filterByRegion != 'all'){ // Pretty sure getRoutesByRegion func
        routes = await getRoutesByRegion(filterByRegion); // Does the err
    } else {// checking for us yo!
        routes = await getAllRoutes();
    };
    if ( filterBySeason != 'all') {
        routes = routes.filter(route => route.bestSeason === filterBySeason);
    }
    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};