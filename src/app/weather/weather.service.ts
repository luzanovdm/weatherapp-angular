import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetPlacesResponse } from './weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  public searchPlaces(geocode: string): Observable<any[]> {
    return this.http
      .get<GetPlacesResponse>(environment.api_keys.geoUrl, {
        params: {
          geocode,
          apikey: environment.api_keys.geoKey,
          format: 'json',
        },
      })
      .pipe(
        map((placesResponse) =>
          placesResponse.response.GeoObjectCollection.featureMember.map(
            (member) => member.GeoObject
          )
        )
      );
  }
}
