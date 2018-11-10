const React = require('react');
const ResponsiveImage = require('../../src/react.tsx');
const shallow = require('enzyme').shallow;

test('snapshot', () => {
    const wrapper = shallow(
        <ResponsiveImage
            image={{
                src: 'test.jpg'
            }}
            imagePath="root/"
        />
    );
    expect(wrapper).toMatchSnapshot();

    const wrapper1 = shallow(
        <ResponsiveImage
            image={{
                src: 'test.jpg'
            }}
            imagePath="root/"
            onClick={() => undefined}
        />
    );
    expect(wrapper1).toMatchSnapshot();

    const wrapper2 = shallow(
        <ResponsiveImage
            image={{
                src: 'sample-8.png',
                alt: 'Sample ALT',
                sizes:
                    '(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px',
                srcset: [
                    {
                        src: 'sample-8x8',
                        size: 8
                    }
                ]
            }}
        />
    );
    expect(wrapper2).toMatchSnapshot();

    const wrapper3 = shallow(
        <ResponsiveImage
            image={{
                src: 'sample-8.png',
                sizes:
                    '(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px',
                srcset: [
                    {
                        src: 'sample-8x8',
                        size: 8
                    }
                ],
                sources: [
                    {
                        media: '(max-width: 37.5em)',
                        sizes: '20vw',
                        srcset: [
                            {
                                src: 'potato.png',
                                size: 16
                            },
                            {
                                src: 'sample-10-x16',
                                size: 16
                            }
                        ]
                    }
                ]
            }}
        />
    );
    expect(wrapper3).toMatchSnapshot();
});
