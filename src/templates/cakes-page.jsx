import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Box } from 'rebass';

import {
  Banner as Base,
  JumbotronWrapper as BaseWrapper
} from '../components/Carousel.jsx';
import Image from '../components/Image.jsx';
import Selector from '../components/Selector.jsx';
import About from '../components/About.jsx';
import Card from '../components/Card.jsx';

const Banner = Base.extend`
  top: 15vw;

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    top: 17vw;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    display: none;
  }
`;

const JumbotronWrapper = BaseWrapper.extend`
  height: 25vw;
`;

const CardsGrid = Box.extend`
  width: 100%;
  height: auto;
  background-color: white;
  display: grid;
  justify-content: space-evenly;
  align-items: center;
  grid-template: 400px / repeat(4, 1fr);
  grid-auto-rows: 300px;
  grid-auto-columns: 280px;
  grid-gap: 2rem;

  > div {
    justify-self: center;
    align-self: center;
  }

  @media (max-width: ${props => props.theme.gridBreakpoints[1]}) {
    grid-template: 400px / repeat(3, 1fr);
  }

  @media (max-width: ${props => props.theme.gridBreakpoints[0]}) {
    grid-template: 400px / repeat(2, 1fr);
    grid-gap: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template: 400px / 1fr;
    grid-gap: 0rem;
  }
`;

const AboutWrapper = Box.extend`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  justify-content: center;
  grid-row: span 1;
  grid-column: span 4;
  @media (max-width: ${props => props.theme.gridBreakpoints[1]}) {
    grid-column: span 3;
  }
  @media (max-width: ${props => props.theme.gridBreakpoints[0]}) {
    grid-column: span 2;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-column: span 1;
  }
`;

export class CakesPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryNames: this.props.categories.map(category => category.name),
      data: this.props.categories,
      currentData: this.props.categories[0],
      currentCategory: this.props.categories[0].name,
    };
  }

  changeCategory = newCategory => {
    if (newCategory !== undefined) {
      const [currentData] = this.state.data.filter(
        category => category.name === newCategory
      );
      this.setState({
        currentCategory: newCategory,
        currentData: currentData,
      });
    }
  };

  componentDidMount() {
    this.setState({
      currentData: this.state.data[0],
      currentCategory: this.state.categoryNames[0]
    });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextState.currentData !== undefined &&
      nextState.currentCategory !== this.state.currentCategory
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      const nextCategoryNames = this.props.categories.map(
        category => category.name
      );
      const nextData = this.props.categories;
      this.setState({ categoryNames: nextCategoryNames, data: nextData });
    }
  }

  render() {
    const { jumbotron, title, categories, isPreview } = this.props;

    const dimensions = {
      card: {
        width: '240px',
        height: '270px'
      },
      image: '200px'
    };
    return (
      <Fragment>
        <JumbotronWrapper>
          <Image image={jumbotron} isPreview={isPreview} />
          <Banner teal small>
            {title}
          </Banner>
        </JumbotronWrapper>
        <Selector
          categories={this.state.categoryNames}
          activeCategory={this.state.currentCategory}
          handleChange={this.changeCategory}
        />
        <CardsGrid px={[0, 10, 40]} my={[0, 50, 80]}>
          <Fragment>
            <AboutWrapper>
              <About
                flat
                data={this.state.currentData.about}
                isPreview={isPreview}
              />
            </AboutWrapper>
            {this.state.currentData.cards.map((card, i) => (
              <Card
                dimensions={dimensions}
                data={card}
                key={`card${i}`}
                isPreview={isPreview}
              />
            ))}
          </Fragment>
        </CardsGrid>
      </Fragment>
    );
  }
}

CakesPageTemplate.propTypes = {
  jumbotron: PropTypes.object,
  title: PropTypes.string,
  categories: PropTypes.array,
  isPreview: PropTypes.bool
};

const CakesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <CakesPageTemplate
      jumbotron={frontmatter.jumbotron}
      title={frontmatter.title}
      categories={frontmatter.categories}
      isPreview={false}
    />
  );
};

CakesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default CakesPage;

export const cakesPageQuery = graphql`
  query cakesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        jumbotron {
          childImageSharp {
            sizes(
              maxWidth: 2000
              maxHeight: 500
              quality: 85
              traceSVG: { color: "#A7DBD8" }
            ) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
        categories {
          name
          about {
            image {
              childImageSharp {
                sizes(
                  maxWidth: 300
                  maxHeight: 300
                  quality: 85
                  traceSVG: { color: "#A7DBD8" }
                ) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
                }
              }
            }
            alt
            heading
            description
          }
          cards {
            image {
              childImageSharp {
                sizes(
                  maxWidth: 500
                  maxHeight: 500
                  quality: 85
                  traceSVG: { color: "#A7DBD8" }
                ) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
                }
              }
            }
            label
          }
        }
      }
    }
  }
`;