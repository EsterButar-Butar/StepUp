# =========================================================
# IMPORT LIBRARY
# =========================================================
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# =========================================================
# PAGE CONFIG
# =========================================================
st.set_page_config(
    page_title="Dashboard Analisis Kesesuaian Pekerjaan",
    page_icon="📊",
    layout="wide"
)

# =========================================================
# COLOR VARIABLE
# =========================================================
CARD_COLOR = "#F8FAFF"
APP_BACKGROUND = "#E7ECFA"
BORDER_COLOR = "#D6E4FF"
TITLE_COLOR = "#1E3A8A"

# =========================================================
# CUSTOM CSS
# =========================================================
st.markdown(f"""
<style>

/* =====================================================
APP BACKGROUND
===================================================== */
.stApp {{
    background-color: {APP_BACKGROUND};
}}

/* =====================================================
MAIN CONTAINER
===================================================== */
.block-container {{
    padding-top: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    max-width: 1400px;
}}

/* =====================================================
TITLE
===================================================== */
h1 {{
    text-align: center;
    font-size: 52px !important;
    font-weight: 800 !important;
    color: #111827;
    margin-bottom: 40px;
}}

/* =====================================================
METRIC CARD
===================================================== */
div[data-testid="stMetric"] {{
    background-color: #FFFFFF !important;
    border: 1px solid {BORDER_COLOR} !important;
    border-radius: 20px !important;
    padding: 25px !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}}

div.stMetric {{
    background-color: #FFFFFF !important;
}}

/* =====================================================
METRIC LABEL
===================================================== */
[data-testid="stMetricLabel"] {{
    color: #374151 !important;
    font-size: 15px !important;
    font-weight: 700 !important;
}}

/* =====================================================
METRIC VALUE
===================================================== */
[data-testid="stMetricValue"] {{
    color: #111827 !important;
    font-size: 46px !important;
    font-weight: 800 !important;
}}

/* =====================================================
CHART CONTAINER
===================================================== */
[data-testid="stVerticalBlockBorderWrapper"] {{
    background-color: {CARD_COLOR} !important;
    border-radius: 20px !important;
    padding: 20px !important;
    border: 1px solid {BORDER_COLOR} !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;
    overflow: hidden;
}}

/* =====================================================
CHART TITLE
===================================================== */
.chart-title {{
    color: {TITLE_COLOR};
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 15px;
}}

/* =====================================================
DIVIDER
===================================================== */
.divider {{
    height: 1px;
    background-color: {BORDER_COLOR};
    margin-bottom: 20px;
}}

</style>
""", unsafe_allow_html=True)

# =========================================================
# STYLE
# =========================================================
sns.set_style("white")

# =========================================================
# DATA
# =========================================================
kategori = [
    "Engineering",
    "Economy",
    "Technology",
    "Creative Design",
    "Law & Public"
]

persentase = [21.1, 20.6, 18.3, 19.5, 20.6]

min_score = [0.40, 0.35, 0.30, 0.25, 0.38]
avg_score = [0.75, 0.72, 0.68, 0.65, 0.70]
max_score = [1.00, 0.95, 0.98, 0.92, 0.99]

hard_skill = [
    "excel",
    "graphic design",
    "adobe creative suite",
    "sql",
    "cad",
    "matlab",
    "legal research",
    "process design",
    "python",
    "policy knowledge"
]

hard_count = [900, 820, 810, 770, 740, 630, 625, 620, 590, 570]

soft_skill = [
    "problem solving",
    "communication",
    "critical thinking",
    "analysis",
    "attention to detail",
    "adaptability",
    "collaboration",
    "research",
    "precision",
    "planning"
]

soft_count = [2020, 1980, 1600, 1590, 1320, 1290, 1280, 1280, 1260, 1210]

# =========================================================
# TITLE
# =========================================================
st.title("Dashboard Analisis Kesesuaian Pekerjaan")

# =========================================================
# METRICS
# =========================================================
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        "TOTAL DATA",
        "9.888",
        "Resume dianalisis"
    )

with col2:
    st.metric(
        "SKOR RATA-RATA",
        "0.72",
        "Match score"
    )

with col3:
    st.metric(
        "KATEGORI UTAMA",
        "Engineering",
        "21.3% dari total"
    )

with col4:
    st.metric(
        "POSISI UNIK",
        "116",
        "Job roles"
    )

st.markdown("<br>", unsafe_allow_html=True)

# =========================================================
# ROW 1
# =========================================================
chart1, chart2 = st.columns(2)

# =========================================================
# PIE CHART
# =========================================================
with chart1:

    with st.container(border=True):

        st.markdown(
            '<div class="chart-title">Distribusi Kategori Pekerjaan</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="divider"></div>',
            unsafe_allow_html=True
        )

        plt.style.use("default")

        fig1, ax1 = plt.subplots(
            figsize=(6,5),
            facecolor="#F8FAFF"
        )

        fig1.patch.set_facecolor("#F8FAFF")
        ax1.set_facecolor("#F8FAFF")

        colors = [
            "#2F63D8",
            "#5C95E5",
            "#82AEE6",
            "#A8C1E6",
            "#C3D1E6"
        ]

        explode = [0.06, 0, 0, 0, 0]

        ax1.pie(
            persentase,
            labels=kategori,
            autopct='%1.1f%%',
            startangle=90,
            explode=explode,
            colors=colors,
            wedgeprops={
                "edgecolor": "#F8FAFF",
                "linewidth": 2
            },
            textprops={
                "fontsize": 10,
                "color": "#111827"
            }
        )

        ax1.axis("equal")
        ax1.grid(False)

        for spine in ax1.spines.values():
            spine.set_visible(False)

        plt.tight_layout()

        st.pyplot(
            fig1,
            use_container_width=True
        )

# =========================================================
# SCORE CHART
# =========================================================
with chart2:

    with st.container(border=True):

        st.markdown(
            '<div class="chart-title">Distribusi Skor Kesesuaian per Kategori</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="divider"></div>',
            unsafe_allow_html=True
        )

        df = pd.DataFrame({
            "Kategori": kategori,
            "Min": min_score,
            "Average": avg_score,
            "Max": max_score
        })

        fig_score = px.bar(
            df,
            x="Kategori",
            y=["Min", "Average", "Max"],
            barmode="group",
            color_discrete_sequence=[
                "#D6E6FF",
                "#2F63D8",
                "#5C95E5"
            ]
        )

        fig_score.update_layout(

            paper_bgcolor="#F8FAFF",
            plot_bgcolor="#F8FAFF",

            font=dict(
                color="#111827",
                size=14
            ),

            margin=dict(
                t=10,
                b=10,
                l=10,
                r=10
            ),

            xaxis=dict(
                title="",
                showgrid=False
            ),

            yaxis=dict(
                title="",
                showgrid=False
            ),

            legend=dict(
                orientation="h",
                y=1.1
            )
        )

        st.plotly_chart(
            fig_score,
            use_container_width=True,
            config={
                "displayModeBar": False
            }
        )

# =========================================================
# ROW 2
# =========================================================
skill1, skill2 = st.columns(2)

# =========================================================
# HARD SKILL
# =========================================================
with skill1:

    with st.container(border=True):

        st.markdown(
            '<div class="chart-title">Required Hard Skill</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="divider"></div>',
            unsafe_allow_html=True
        )

        hard_df = pd.DataFrame({
            "Hard Skill": hard_skill,
            "Count": hard_count
        })

        fig_hard = px.bar(
            hard_df,
            x="Count",
            y="Hard Skill",
            orientation='h',
            color="Count",
            color_continuous_scale=[
                "#D6E6FF",
                "#82AEE6",
                "#2F63D8"
            ],
            text="Count"
        )

        fig_hard.update_traces(
            textposition="outside"
        )

        fig_hard.update_layout(

            paper_bgcolor="#F8FAFF",
            plot_bgcolor="#F8FAFF",

            font=dict(
                color="#111827",
                size=14
            ),

            margin=dict(
                t=10,
                b=10,
                l=10,
                r=10
            ),

            xaxis=dict(
                title="",
                showgrid=False
            ),

            yaxis=dict(
                title="",
                categoryorder='total ascending',
                showgrid=False
            ),

            coloraxis_showscale=False
        )

        st.plotly_chart(
            fig_hard,
            use_container_width=True,
            config={
                "displayModeBar": False
            }
        )

# =========================================================
# SOFT SKILL
# =========================================================
with skill2:

    with st.container(border=True):

        st.markdown(
            '<div class="chart-title">Required Soft Skill</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="divider"></div>',
            unsafe_allow_html=True
        )

        soft_df = pd.DataFrame({
            "Soft Skill": soft_skill,
            "Count": soft_count
        })

        fig_soft = px.bar(
            soft_df,
            x="Count",
            y="Soft Skill",
            orientation='h',
            color="Count",
            color_continuous_scale=[
                "#D6E6FF",
                "#82AEE6",
                "#2F63D8"
            ],
            text="Count"
        )

        fig_soft.update_traces(

            marker=dict(
                line=dict(
                    width=0
                )
            ),

            textposition="outside",

            hovertemplate=
            "<b>%{y}</b><br>" +
            "Count: %{x}<extra></extra>"
        )

        fig_soft.update_layout(

            paper_bgcolor="#F8FAFF",
            plot_bgcolor="#F8FAFF",

            font=dict(
                color="#111827",
                size=14
            ),

            margin=dict(
                t=10,
                b=10,
                l=10,
                r=10
            ),

            xaxis=dict(
                title="",
                showgrid=False,
                zeroline=False,
                showline=False
            ),

            yaxis=dict(
                title="",
                categoryorder='total ascending',
                showgrid=False,
                zeroline=False,
                showline=False
            ),

            coloraxis_showscale=False,

            hoverlabel=dict(
                bgcolor="#FFFFFF",
                font_size=14,
                font_color="#111827"
            ),

            height=500
        )

        st.plotly_chart(
            fig_soft,
            use_container_width=True,
            config={
                "displayModeBar": False
            }
        )