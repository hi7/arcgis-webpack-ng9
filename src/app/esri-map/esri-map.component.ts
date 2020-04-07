import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import FeatureLayer from 'arcgis-js-api/layers/FeatureLayer';
import VectorTileLayer from 'arcgis-js-api/layers/VectorTileLayer';
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
  private map: Map;
  private trailsLayer: FeatureLayer;
  private treeLayer: FeatureLayer;
  private vectorTileLayer: VectorTileLayer;

  constructor() { }

  public async initializeMap() {
    try {
      const mapProperties = {
        basemap: 'streets',
      };
      this.map = new Map(mapProperties);

      const mapViewProperties = {
        center: [0.1278, 51.5074],
        container: this.mapViewEl.nativeElement,
        map: this.map,
        zoom: 10,
      };

      // Trails feature layer (lines)
      this.trailsLayer = new FeatureLayer({
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0',
      });

      this.treeLayer = new FeatureLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
      });

      this.vectorTileLayer = new VectorTileLayer({
        // URL to the style of vector tiles
        url: 'https://www.arcgis.com/sharing/rest/content/items/4cf7e1fb9f254dcda9c8fbadb15cf0f8/resources/styles/root.json',
      });

      this.view = new MapView(mapViewProperties);
      await this.view.when();
      return this.view;
    } catch (error) {
      console.log('Esri: ', error);
    }
  }

  private toggleLayer(layer, add: boolean) {
    if (add) {
      this.map.add(layer, 0);
    } else {
      this.map.remove(layer, 0);
    }
  }

  public onTrailsChange(isChecked: boolean) {
    this.toggleLayer(this.trailsLayer, isChecked);
  }

  public onTreeChange(isChecked: boolean) {
    this.toggleLayer(this.treeLayer, isChecked);
  }

  public onVectorsChange(isChecked: boolean) {
    this.toggleLayer(this.vectorTileLayer, isChecked);
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
