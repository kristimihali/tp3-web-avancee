import {ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

  public map: google.maps.Map;
  public lat = 45.171213;
  public lng = 5.7288023;
  public coordinates;

  @ViewChild('map', { static: false }) gmap: ElementRef;

  ngAfterViewInit(): void {
    this.mapLoad();
  }
  mapLoad(): void {

    if (!navigator.geolocation) {
        console.log('position not found');
       return;
    }
    navigator.geolocation.getCurrentPosition((position: Position) => {
      if (!position) {
        console.log('position not found');
      }
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.coordinates = new google.maps.LatLng(this.lat, this.lng);

      this.map = new google.maps.Map(this.gmap.nativeElement, {
        center: this.coordinates,
        zoom: 8
      });
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lng),
        map: this.map
      });
      marker.setMap(this.map);
    });
  }

}
