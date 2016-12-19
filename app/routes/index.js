import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({

    artists: this.store.query('artist', {
      sort_on: 'name',
      sort_direction: 'desc',
      reload: true
    }),

    top_five_artists: this.store.findAll('artist', { reload: true }).
      then(artist => artist.sortBy('total_albums_sold').reverse().slice(0,5)),

    years: this.get('store').findAll('album')
      .then((albums) => {
        let years = [];
        let unique_years = [];
        let years_objects = [];

        albums.forEach((album) => {
          years.push(album.get('year'));
        });
        years = years.sort((year1,year2) => {
          return year1 - year2;
        });

        unique_years = years.filter((year, i, year_array) => {
          return year_array.indexOf(year) === i;
        });

        years.forEach((year) => {
          if(unique_years.indexOf(year) === -1) {
            unique_years.push(year);
          }
        });

        unique_years.forEach((unique_year) => {
          let count = 0;
          years.forEach((year) => {
            if(year === unique_year) {
              count += 1;
            }
          });
          let year_object = {
            year: unique_year,
            count: count
          };
          years_objects.push(year_object);
        });
        return years_objects;
      }),

      locations: this.get('store').findAll('artist')
      .then((artists) => {
        let locations = [];
        let unique_locations = [];
        let locations_objects = [];

        artists.forEach((artist) => {
          locations.push(artist.get('based_in'));
        });

        locations.forEach((location) => {
          if(unique_locations.indexOf(location) === -1) {
            unique_locations.push(location);
          }
        });

        unique_locations.forEach((unique_location) => {
          let count = 0;
          locations.forEach((location) => {
            if(location === unique_location) {
              count += 1;
            }
          });
          let location_object = {
            location: unique_location,
            count: count
          };
          locations_objects.push(location_object);
        });
        return locations_objects;
      })
    });
  },

  queryParams: {
    sort_on: {
      refreshModel: true
    },
    sort_direction: {
      refreshModel: true
    },
    per_page: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },
});
