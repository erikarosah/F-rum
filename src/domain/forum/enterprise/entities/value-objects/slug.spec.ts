import { Slug } from './slug';

const slugFromText = Slug;

test('should be able to create a new slug from text', () => {
	const slug = slugFromText.createFromText('some text');

	expect(slug.value).toEqual('some-text');
});