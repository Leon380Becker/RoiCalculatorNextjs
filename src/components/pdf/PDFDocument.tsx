"use client"

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Light.ttf', fontWeight: 'light' },
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Inter-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Inter-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
  ],
});

// Image assets
const EaLogoHorizontalWhite = "/images/EA_Logo_Horizontal_RGB_White.png";
const EaCalculator = "/images/EA_calculator_graphic.png";
const ProgramsIcon = "/images/Programs_Icon.png";
const RoadmapsIcon = "/images/Roadmaps_Icon.png";
const TeamRhythmIcon = "/images/TeamRhythm_Icon.png";

const displayDollars = (amount: number) => {
  if (!amount && amount !== 0) return "$0";
  return "$" + Number(amount).toLocaleString();
};
 
const styles = StyleSheet.create({
  // General Page Styling
page: {
  padding: 0,
  fontSize: 12,
  fontFamily: 'Inter',
  backgroundColor: '#fff',
},

// Header Section
header: {
  height: '17mm', 
  backgroundColor: '#362063',
  padding: 10,
  flexDirection: 'row',
  justifyContent: 'space-between', 
  alignItems: 'center',
},
logo: {
  height: 24,
  width: 100,
  marginRight: 20, 
},
eacalculator: {
  height: 494,
  width: 220,
  marginRight: 20, 
},
title: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: 20, 
},

// Body Section
body: {
  height: '259mm', 
  paddingTop: 0, 
},

// Section 1 (Left and Right Boxes)
section1: {
  height: '105mm', 
  flexDirection: 'row',
  marginBottom: 0,
},
section2: {
  height: '154mm', 
  flexDirection: 'row',
  backgroundColor: '#E7E8E9',
},
boxLeft: {
  width: '110mm',
  backgroundColor: '#E8E0FF',
},
boxRight: {
  width: '121mm',
  backgroundColor: '#E8E0FF', 
},
section2boxRight: {
  width: '121mm',
  backgroundColor: '#E7E8E9', 
},

// Box Styling (Upper and Lower)
upperBox: {
  height: '39mm',
  backgroundColor: '#E8E0FF', 
  padding: 10,
},
lowerBox: {
  height: '66mm',
  backgroundColor: '#E8E0FF', 
},
section2UpperBox: {
  height: '91mm',
  backgroundColor: '#E7E8E9', 
  padding: 10,
},
section2LowerBox: {
  height: '63mm',
  backgroundColor: '#E7E8E9', 
},

// Footer Section
footer: {
  height: '21mm', 
  backgroundColor: '#362063',
  padding: 5,
  justifyContent: 'center',
  alignItems: 'center',
},
footerText: {
  color: 'white',
  fontSize: 10,
  textAlign: 'center',
},
footerContent: {
  color: 'white',
  fontSize: 8,
  textAlign: 'left',
  lineHeight: 1.5, 
},

// Left Box Container and Greeting Section
container: {
  width: '100mm',
  height: '105mm',
  flexDirection: 'column',
  backgroundColor: '#E8E0FF',
},
greetingBox: {
  width: '100%',
  height: '39mm',
  paddingVertical: 10,
  paddingHorizontal: '7%',
  justifyContent: 'flex-start',
  backgroundColor: '#E8E0FF',
},
greetingText: {
  fontSize: '13pt',
  fontWeight: 'bold',
  marginTop: 24,
  lineHeight: 1.2,
  maxWidth: '90%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
},
greetingSubText: {
  fontSize: '10.5pt',
  fontWeight: 300,
  lineHeight: 1.5,
  marginTop: 11,
},
imageBox: {
  width: '100%',
  height: '66mm', 
  overflow: 'hidden', 
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#E8E0FF',
  position: 'relative',
},
imageStyle: {
  width: '105%',
  height: '180%',
  objectFit: 'cover',
  paddingTop: '104px', 
},

// Right Box - Section 1 (ROI Information)
box: {
  width: "98mm",
  height: "90mm",
  backgroundColor: "white",
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 11,
  margin: "auto",
  marginLeft: '10pt',
},
containerRoi: {
  padding: '0px 20px',
  width: '98mm',
  height: '105mm',
  flexDirection: 'column',
},
roiRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},
roiTextGroup: {
  flexDirection: 'column',
},
roiHeading: {
  fontSize: '13pt',
  fontWeight: 'bold',
  paddingTop: '4pt',
},
roiSubtext: {
  fontSize: '9pt',
  marginTop: 4,
  paddingBottom: '12pt',
},
roiValue: {
  fontSize: '17pt',
  fontWeight: 'bold',
  marginTop: 4,
  alignSelf: 'flex-start',
  paddingTop: '2pt',
},
label: {
  fontSize: '10pt',
  fontWeight: 'bold',
  marginTop: '8pt',
},
labelcumulative: {
  fontSize: '10pt',
  fontWeight: 'bold',
  marginTop: '3pt',
},
bodyText: {
  fontSize: '9pt',
  lineHeight: 1.3,
  marginBottom: '5pt',
  marginTop: '5pt',
},
value: {
  fontSize: '12pt',
  fontWeight: 'bold',
  alignSelf: 'flex-start',
},
valueGain: {
  fontSize: '12pt',
  fontWeight: 'bold',
  alignSelf: 'flex-start',
  paddingTop: '7pt',
},

// Section 2 Left Box (ROI Details)
roiDetailContainer: {
  width: '110mm',
  height: '154mm',
  backgroundColor: '#E7E8E9',
  paddingTop: 15,
  paddingBottom: 15,
  paddingHorizontal: 25,
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
},
roiDetailHeading: {
  fontSize: 10,
  fontWeight: 700,
  marginBottom: 6,
  textAlign: 'left',
  marginTop: 10,
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 6,
  marginBottom: 6,
  marginLeft: '-1px',
},
rowTitle: {
  fontSize: 8.5,
  width: '65%',
  textAlign: 'left',
  lineHeight: 1.3,
  fontWeight: 'light',
},
rowValue: {
  fontFamily: 'Inter',
  fontSize: 8.7,
  width: '35%',
  textAlign: 'right',
  fontWeight: 400,
},

// Section 2 Right Box - Upper (Graph and Legend)
graphBox: {
  width: '98mm',
  height: '78mm',
  backgroundColor: 'white',
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  marginLeft: 5,
  marginTop: 15,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
},

graphImage: {
  width: '100%', // Adjust as per your need
  height: 300,
  objectFit: 'contain', // Ensure the image maintains its aspect ratio
},

legendRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 6,
  gap: 12,
},
legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  marginHorizontal: 6,
},
legendColor: {
  width: 15,
  height: 3,
  borderRadius: 4,
},
legendText: {
  fontSize: 7,
  fontWeight: 700,
},

// Section 2 Right Box - Lower (Try It Section)
tryItContainer: {
  width: '110mm',
  height: '63mm',
  backgroundColor: '#E7E8E9',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  paddingHorizontal: 5,
  paddingRight: 20,
  paddingTop: 0,
},
tryItHeader: {
  fontSize: 10,
  textAlign: 'center',
  marginBottom: 18,
  color: '#3E444B',
  fontWeight: 500,
  lineHeight: 1.4,
},
tryItRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 10,
  gap: 10,
},
tryItItem: {
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: '30%',
},
tryItImage: {
  width: 30,
  height: 30,
  marginBottom: 6,
},
tryItLabel: {
  fontSize: 8,
  fontWeight: 600,
  color: '#3E444B',
  marginBottom: 14,
  textAlign: 'center',
  lineHeight: 1.2,
},
tryItButton: {
  backgroundColor: '#362063',
  borderRadius: 10,
  paddingVertical: 4,
  paddingHorizontal: 10,
},
tryItButtonText: {
  color: 'white',
  fontSize: 7,
  fontWeight: 500,
  textAlign: 'center',
},

  
  
  
});

const PDFDocument = ({
  name,
  GraphImage,
  delaysPerYear,
  teamsImpacted,
  avgDelayDuration,
  annualCostOfSprintsPerTeam,
  annualCostOfSprintsPerOrganisation,
  annualCostOfDelays,
  annualCostRetroPerTeam,
  annualCostRetroPerOrg,
  costOfEatr,
  costOfEapro,
  costOfEaroa,
  bundleCost,
  retroImprovement,
  sprintPredictability,
  sprintEfficiency,
  yearOneCmlPct,
  yearTwoCmlPct,
  yearThreeCmlPct,
  productivityGain,
}: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your ROI Breakdown</Text>
        <Image style={styles.logo} src={EaLogoHorizontalWhite} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Section 1 */}
        <View style={styles.section1}>
          <View style={styles.boxLeft}>
            {/* Left Box - Upper and Lower */}
            <View style={styles.container}>
            {/* Greeting Section */}
            <View style={styles.greetingBox}>
              <Text style={styles.greetingText}>Hi {name},</Text>
              <Text style={styles.greetingSubText}>
                Thanks for using the Easy Agile ROI calculator.{"\n"}
                Your results are detailed below.
              </Text>
            </View>

            {/* Image Section */}
            <View style={styles.imageBox}>
              <Image src={EaCalculator} style={styles.imageStyle} />
            </View>
          </View>
          </View>

          <View style={styles.boxRight} >
            {/* Right Box */}
            <View style={styles.box}>
            <View style={styles.containerRoi}>
            {/* ROI Section */}
            <View style={styles.roiRow}>
              <View style={styles.roiTextGroup}>
                <Text style={styles.roiHeading}>
                  Your return on{'\n'}investment (ROI)
                </Text>
                <Text style={styles.roiSubtext}>
                  ROI as a percentage of the initial {'\n'}investment.
                </Text>
              </View>
              <Text style={styles.roiValue}>
                {yearThreeCmlPct}%
              </Text>
            </View>

            {/* Productivity Gain */}
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Productivity Gain</Text>
                <Text style={styles.bodyText}>
                  Calculated as the sum of revenue{'\n'}
                  increase and cost savings over{'\n'}
                  the years.
                </Text>
              </View>
              <Text style={styles.valueGain}>{displayDollars(productivityGain)}</Text>
            </View>

            {/* Cumulative ROI by Year */}
            <View style={styles.row}>
              <View>
                <Text style={styles.labelcumulative}>Cumulative ROI</Text>
                <Text style={styles.bodyText}>Year 1</Text>
              </View>
              <Text style={styles.value}>{yearOneCmlPct}%</Text>
            </View>

            <View style={styles.row}>
              <View>
              <Text style={styles.labelcumulative}>Cumulative ROI</Text>
                <Text style={styles.bodyText}>Year 2</Text>
              </View>
              <Text style={styles.value}>{yearTwoCmlPct}%</Text>
            </View>

            <View style={styles.row}>
              <View>
              <Text style={styles.labelcumulative}>Cumulative ROI</Text>
                <Text style={styles.bodyText}>Year 3</Text>
              </View>
              <Text style={styles.value}>{yearThreeCmlPct}%</Text>
            </View>
          </View>
            </View>

          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.section2}>
          <View style={styles.boxLeft}>
            {/* Left Box - Section 2 */}
            <View style={styles.roiDetailContainer}>
            {/* ROI in Detail */}
            <Text style={styles.roiDetailHeading}>ROI in detail</Text>
            {[
              { title: 'Average number of delays per year', value: delaysPerYear },
              { title: 'Average number of teams impacted', value: teamsImpacted },
              { title: 'Average delay duration in days', value: avgDelayDuration },
              { title: 'Annual cost of sprints per team', value: `$${Number(annualCostOfSprintsPerTeam).toLocaleString()}` },
              { title: 'Annual cost of sprints per organisation', value: `$${Number(annualCostOfSprintsPerOrganisation).toLocaleString()}` },
              { title: 'Annual cost of engineering and product delays', value: `$${Number(annualCostOfDelays).toLocaleString()}` },
              {
                title: 'Annual cost of retro cost per team (.75hrs per week of sprint)',
                value: `$${Number(annualCostRetroPerTeam).toLocaleString()}`,
              },
              {
                title: 'Annual cost of retro cost per organisation (.75hrs per week of sprint)',
                value: `$${Number(annualCostRetroPerOrg).toLocaleString()}`,
              },
            ].map((item, idx) => (
              <View style={styles.row} key={`detail-${idx}`}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
            ))}

            {/* Tooling Cost */}
            <Text style={styles.roiDetailHeading}>Tooling Cost</Text>
            {[
              { title: 'Cost of Easy Agile TeamRhythm', value: `$${Number(costOfEatr).toLocaleString()}` },
              { title: 'Cost of Easy Agile Programs', value: `$${Number(costOfEapro).toLocaleString()}` },
              { title: 'Cost of Easy Agile Roadmaps', value: `$${Number(costOfEaroa).toLocaleString()}` },
              { title: 'Bundle (all products)', value: `$${Number(bundleCost).toLocaleString()}` },
            ].map((item, idx) => (
              <View style={styles.row} key={`tool-${idx}`}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
            ))}

            {/* Productivity */}
            <Text style={styles.roiDetailHeading}>Productivity (Annual)</Text>
            {[
              {
                title: 'Retro improvement - 12.5% improvement',
                value: `$${Number(retroImprovement).toLocaleString()}`,
              },
              {
                title: 'Sprint predictability (reduction in delay) - 7.5% improvement',
                value: `$${Number(sprintPredictability).toLocaleString()}`,
              },
              {
                title: 'Sprint efficiency via collaboration and visibility - 10% improvement',
                value: `$${Number(sprintEfficiency).toLocaleString()}`,
              },
            ].map((item, idx) => (
              <View style={styles.row} key={`prod-${idx}`}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          </View>

          <View style={styles.section2boxRight}>
            {/* Right Box - Upper and Lower */}
            <View style={styles.section2UpperBox}>
            <View style={styles.graphBox}>
            <Image
              src={GraphImage}
              style={styles.graphImage}
            />

            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#5F0BFF' }]} />
                <Text style={styles.legendText}>ROI</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
                <Text style={styles.legendText}>Annual Average ROI</Text>
              </View>
            </View>
          </View>

            </View>
            <View style={styles.section2LowerBox}>
            <View style={styles.tryItContainer}>
            <Text style={styles.tryItHeader}>
              Try Easy Agile products free via the{'\n'}Atlassian Marketplace
            </Text>

            <View style={styles.tryItRow}>
              {[
                { icon: TeamRhythmIcon, label: 'TeamRhythm' },
                { icon: ProgramsIcon, label: 'Programs' },
                { icon: RoadmapsIcon, label: 'Roadmaps' },
              ].map((item, idx) => (
                <View style={styles.tryItItem} key={idx}>
                  <Image src={item.icon} style={styles.tryItImage} />
                  <Text style={styles.tryItLabel}>
                    Easy Agile{'\n'}{item.label}
                  </Text>
                  <View style={styles.tryItButton}>
                    <Text style={styles.tryItButtonText}>TRY IT FREE</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerContent}>
          Since 2016, Easy Agile's apps have empowered over 160,000 users worldwide to improve their planning and delivery within Jira. From sprint planning
          {'\n'}
          and retrospectives, all the way to large-scale enterprise planning, our tools help teams of all sizes collaborate effectively, visualize their work, and
          {'\n'}
          consistently deliver value to their customers. Find our apps on the Atlassian Marketplace, with flexible cloud and data center pricing options.
        </Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
