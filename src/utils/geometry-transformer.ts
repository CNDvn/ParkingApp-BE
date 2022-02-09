import { ValueTransformer } from 'typeorm';
import { Geometry } from 'geojson';
import * as wkx from 'wkx';

export class GeometryTransformer implements ValueTransformer {
  to(geojson: Geometry): string {
    return wkx.Geometry.parseGeoJSON(geojson).toWkt();
  }

  from(wkb: string): Record<string, string> | undefined {
    if (!wkb) return;

    return wkx.Geometry.parse(wkb).toGeoJSON();
  }
}
