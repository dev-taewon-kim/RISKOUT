import React, { useEffect, useRef } from 'react';
import { Box, Grid, Typography, Skeleton, Divider } from '@mui/material';
// import client from '../lib/api/client';
import axios from 'axios'
import '../css/fonts.css';

import ExclusiveSelect from '../components/RiskReport/ExclusiveSelect';
import { getLineBreakText, useSessionStorage } from '../js/util';
import ThreatMediaCard from '../components/RiskReport/ThreatMediaCard';
import PdfExportButton from '../components/RiskReport/PdfExportButton';
import Graphs from '../components/RiskReport/Graphs';
import ScrappedArticle from '../components/RiskReport/ScrappedArticle';
import Demo from '../components/Demo';
import { useHistory } from 'react-router';
import { darkTheme, palette } from '../darkTheme';

const RiskReport = (props) => {
  const history = useHistory();
  let token = localStorage.getItem('token');
  if (token == null) {
    alert('로그인이 필요한 페이지 입니다.');
    history.push('/login');
  }

  const [getCart, addCart] = useSessionStorage('riskoutShoppingCart');
  const [dateRange, setDateRange] = React.useState('all'); // for period select
  const [data, setData] = React.useState({});
  const [isPending, setPending] = React.useState(true);
  const error = false;

  const loadData = async () => {

    const searchUrl = '/static/data/ReportData.example.json';
    const client = axios.create({
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    });

    const data = await client.get(searchUrl, {
      articleIds: getCart().length ? getCart() : [30, 40, 50],
      period: 24,
      time: new Date().toTimeString(), // "uniqueness parameter"
    })
    await setData(data.data);
    await setPending(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const pdfExportComponent = useRef(null);
  const loadingScreen = (
    <section id="sub_contents" style={{ width: '100vw', height: '100vh' }}>
      <div className="sub01_wrap" style={{ marginBottom: 40 }}>
        <h2 className="h2_tit2">보고서 생성 중...</h2>
      </div>
      <div className="content clfix">
        <Skeleton animation="wave" height={45} width="45%" />
        <Skeleton animation="wave" height={35} width="40%" />
        <Skeleton animation="wave" height={30} width="35%" />
        <Skeleton
          animation="wave"
          height={30}
          width="20%"
          style={{ marginBottom: 26 }}
        />

        <Box sx={{ display: 'flex' }}>
          <Box>
            {/* 일일 리스크 현황 */}
            <Skeleton
              sx={{
                borderRadius: '5px',
                marginTop: '13px',
                marginLeft: '-10px',
                marginRight: '30px',
              }}
              width={879}
              height={450}
              animation="wave"
              variant="rectangular"
            />
          </Box>
          <Box>
            <Skeleton
              sx={{ borderRadius: '5px', marginTop: '13px' }}
              width={879}
              height={450}
              animation="wave"
              variant="rectangular"
            />
          </Box>
        </Box>

        {/* 리스크 종류별 비율 (%) */}
      </div>
    </section>
  );

  const errorScreen = (
    <section id="sub_contents">
      <div className="sub01_wrap">
        <h2 className="h2_tit2">Error</h2>
      </div>
      <div className="content clfix"></div>
    </section>
  );

  const ReportDivider = (
    <Divider
      sx={{
        borderStyle: 'none',
        borderWidth: '0px',
        boxShadow: '0px 0px 1px 1px #49484c',
      }}
    />
  );

  return (
    <>
      {isPending ? (
        loadingScreen
      ) : error ? (
        errorScreen
      ) : (
        <>
          <PdfExportButton exportTarget={pdfExportComponent} />
          <Box
            id="sub_contents"
            ref={pdfExportComponent}
            sx={{
              bgcolor: (theme) => theme.palette.background.default,
              p: 1,
            }}
          >
            <Box className="sub01_wrap">
              <Grid container spacing={1} direction="column">
                <Grid item pb={1}>
                  <Typography
                    variant="h2"
                    fontFamily="Source Sans Pro"
                    fontWeight="500"
                  >
                    REPORT{' '}
                    <Typography
                      variant="em"
                      sx={{
                        fontSize: '0.5em',
                        fontStyle: 'normal',
                        fontFamily: (theme) => theme.typography.fontFamily,
                      }}
                    >
                      {new Intl.DateTimeFormat('ko-KR', {
                        dateStyle: 'full',
                      }).format(new Date())}{' '}
                      (24h)
                    </Typography>
                  </Typography>
                </Grid>
                <Demo />
                <Grid item pb={3}>
                  <Typography sx={{ fontSize: '20px' }}>
                    {data.isDone ? getLineBreakText(data.overview) : '현재 데이터가 존재하지 않습니다.'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Divider
                    sx={{
                      borderStyle: 'none',
                      borderWidth: '0px',
                      boxShadow: '0px 0px 1px 1px #49484c',
                    }}
                  />
                </Grid>
              </Grid>
              {data.isDone && (
                <>
                  <Grid
                    container
                    mt={5}
                    // pr={11}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="95%"
                  >
                    <Grid
                      item
                      container
                      spacing={1}
                      xs={12}
                      md={6}
                      direction="column"
                    >
                      <Grid item pb={1}>
                        <Typography
                          variant="h3"
                          sx={{ fontSize: '2.3rem' }}
                          fontFamily="Source Sans Pro"
                          fontWeight="500"
                        >
                          Risk Briefing
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Graphs data={data.briefingGraphData} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container direction="column" spacing={3} ml={0}>
                        {data.briefingContents.map((props, i) => {
                          return (
                            <ScrappedArticle
                              key={'scrapped' + i}
                              {...props}
                              style={{ paddingLeft: 0 }}
                            />
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      borderStyle: 'none',
                      borderWidth: '0px',
                      boxShadow: '0px 0px 1px 1px #49484c',
                    }}
                  />
                  <Grid
                    container
                    className="content clfix"
                    direction="column"
                    spacing={3}
                    mt={1}
                  >
                    <Grid item>
                      <Typography
                        variant="h3"
                        sx={{ fontSize: '2.3rem' }}
                        fontFamily="Source Sans Pro"
                        fontWeight="500"
                      >
                        Major Risks
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                      columnSpacing={5}
                    >
                      {data.majorEvents.map(
                        ({
                          imageUrl,
                          title,
                          threatType,
                          sourceName,
                          url,
                          datetime,
                        }) => (
                          <ThreatMediaCard
                            imageUrl={imageUrl}
                            title={title}
                            threatType={threatType}
                            sourceName={sourceName}
                            url={url}
                            datetime={datetime}
                            key={title}
                          />
                        )
                      )}
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default RiskReport;
