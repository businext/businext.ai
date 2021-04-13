import { ExtractionProvider } from './extractionProvider';
import { Image, ExtractedImage } from '../../models/data_models/image';

export class MockExtractionProvider implements ExtractionProvider {
	extract(images: Array<Image>): Array<ExtractedImage> {
		return <Array<ExtractedImage>>[
			{
				origin: {
					source: 'https://live.staticflickr.com/5475/11104337814_0ff2f27b74_b.jpg',
					provider: 'YELP',
				},
				extractions: {
					assigned_labels: [
						{
							description: 'Table',
							confidence: 0.95860934,
						},
						{
							description: 'Furniture',
							confidence: 0.94070464,
						},
						{
							description: 'Light',
							confidence: 0.9116215,
						},
						{
							description: 'Interior design',
							confidence: 0.87023306,
						},
						{
							description: 'Lighting',
							confidence: 0.86392134,
						},
					],
					detected_objects: [
						{
							object_name: 'Lighting',
							confidence: 0.904524,
							bounding_poly: [
								{
									x: 0.76475835,
									y: 0.20335792,
								},
								{
									x: 0.87245864,
									y: 0.20335792,
								},
								{
									x: 0.87245864,
									y: 0.34688333,
								},
								{
									x: 0.76475835,
									y: 0.34688333,
								},
							],
						},
						{
							object_name: 'Lighting',
							confidence: 0.88767177,
							bounding_poly: [
								{
									x: 0.3563818,
									y: 0.032792393,
								},
								{
									x: 0.748887,
									y: 0.032792393,
								},
								{
									x: 0.748887,
									y: 0.32085678,
								},
								{
									x: 0.3563818,
									y: 0.32085678,
								},
							],
						},
						{
							object_name: 'Lighting',
							confidence: 0.8864915,
							bounding_poly: [
								{
									x: 0.3563818,
									y: 0.13552843,
								},
								{
									x: 0.5530774,
									y: 0.13552843,
								},
								{
									x: 0.5530774,
									y: 0.28655308,
								},
								{
									x: 0.3563818,
									y: 0.28655308,
								},
							],
						},
						{
							object_name: 'Chair',
							confidence: 0.69909143,
							bounding_poly: [
								{
									x: 0.37836167,
									y: 0.72858626,
								},
								{
									x: 0.5754644,
									y: 0.72858626,
								},
								{
									x: 0.5754644,
									y: 0.9956505,
								},
								{
									x: 0.37836167,
									y: 0.9956505,
								},
							],
						},
						{
							object_name: 'Lighting',
							confidence: 0.69858944,
							bounding_poly: [
								{
									x: 0.91422135,
									y: 0.33225027,
								},
								{
									x: 0.9911892,
									y: 0.33225027,
								},
								{
									x: 0.9911892,
									y: 0.5222932,
								},
								{
									x: 0.91422135,
									y: 0.5222932,
								},
							],
						},
					],
				},
			},
			{
				origin: {
					source:
						'https://images.unsplash.com/photo-1501843508755-af0829d48618?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzh8fHxlbnwwfHx8&w=1000&q=80',
					provider: 'GOOGLE PLACES',
				},
				extractions: {
					assigned_labels: [
						{
							description: 'Tableware',
							confidence: 0.9671577,
						},
						{
							description: 'Coffee cup',
							confidence: 0.9540218,
						},
						{
							description: 'Drinkware',
							confidence: 0.9455044,
						},
						{
							description: 'Cup',
							confidence: 0.9062822,
						},
					],
					detected_objects: [
						{
							object_name: 'Coffee cup',
							confidence: 0.9020074,
							bounding_poly: [
								{
									x: 0.28601333,
									y: 0.4320761,
								},
								{
									x: 0.5427791,
									y: 0.4320761,
								},
								{
									x: 0.5427791,
									y: 0.7787066,
								},
								{
									x: 0.28601333,
									y: 0.7787066,
								},
							],
						},
					],
				},
			},
		];
	}
}
