import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import FeatureLayer from 'arcgis-js-api/layers/FeatureLayer';
import Map from 'arcgis-js-api/Map';
import MapView from 'arcgis-js-api/views/MapView';

@Component({
  selector: 'app-esri-map',
  styleUrls: ['./esri-map.component.css'],
  templateUrl: './esri-map.component.html',
})
export class EsriMapComponent implements OnInit, OnDestroy {
  // <div> with id mapViewNode
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  private view: MapView = null;

  constructor() { }

  public async initializeMap() {
    try {
      const mapProperties = {
        basemap: 'streets',
      };
      const aMap = new Map(mapProperties);

      const mapViewProperties = {
        center: [0.1278, 51.5074],
        container: this.mapViewEl.nativeElement,
        map: aMap,
        zoom: 10,
      };

      // Trails feature layer (lines)
      const trailsLayer = new FeatureLayer({
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0',
      });
      aMap.add(trailsLayer, 0);

      // Parks and open spaces (polygons)
      const parksLayer = new FeatureLayer({
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0',
      });
      aMap.add(parksLayer, 0);

      this.view = new MapView(mapViewProperties);
      await this.view.when();
      return this.view;
    } catch (error) {
      console.log('Esri: ', error);
    }
  }

  public ngOnInit(): void {
    this.initializeMap().then((mapView) => {
      console.log('mapView ready: ', mapView.ready);
    });
  }

  public ngOnDestroy(): void {
    if (this.view) {
      this.view.container = null; // destroy map view
    }
  }
}
