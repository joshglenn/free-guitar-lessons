import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

import InnerHTML from "dangerously-set-html-content";

const videoWidth = 350
const videoHeight = videoWidth * 1.77

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsLesson.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsLesson.title}</h1>

        { data.datoCmsLesson.videoUrl ? 
          <div>
            {/* <div className="sheet__gallery">
              <Img fluid={data.datoCmsLesson.coverImage.fluid} />
            </div> */}

            {/** Output coverImage url for debugging purposes */}
            {/* {data.datoCmsLesson.coverImage.fluid?<h3>{data.datoCmsLesson.coverImage.url}</h3>:<br/>} */}

            <video 
              width={videoWidth} height={videoHeight} 
              controls 
              poster={data.datoCmsLesson.coverImage.url} 
              style={{backgroundColor:'silver'}}
              controlsList="nodownload"
              onClick={()=>{console.log("Somebody clicked the video")}}
              >
              <source src={data.datoCmsLesson.videoUrl} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>

        : 
          
        <p>{console.log(data.datoCmsLesson)}</p> 
        
        }

        { data.datoCmsLesson.embedCode ?
          <div className="sheet__relatedVideoWrapper">
            <h2>Related Videos</h2>
            <InnerHTML html={data.datoCmsLesson.embedCode} />            
          </div>
        : 
          <br/>
        }

        {/* <p className="sheet__lead">{data.datoCmsLesson.excerpt}</p> */}
        {/* <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsLesson.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsLesson.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div> */}
        {/* <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsLesson.descriptionNode.childMarkdownRemark.html,
          }}
        /> */}
        {/* <div className="sheet__gallery">
          <Img fluid={data.datoCmsLesson.coverImage.fluid} />
        </div> */}
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query LessonQuery($slug: String!) {
    datoCmsLesson(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      description
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      videoUrl
      embedCode
    }
  }
`
