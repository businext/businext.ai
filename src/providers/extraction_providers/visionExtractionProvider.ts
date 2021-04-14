import { ExtractionProvider } from './extractionProvider'
import { Image, ExtractedImage } from '../../models/data_models/image'

import vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

export class VisionExtractionProvider implements ExtractionProvider {
    public extract(images: Array<Image>): Array<ExtractedImage> {
        // TODO: implement with Google Vision
    }
}