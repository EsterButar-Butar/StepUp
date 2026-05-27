import ast
import pandas as pd
import plotly.express as px
import streamlit as st

from pathlib import Path
from PIL import Image

# =========================================================
# PAGE CONFIG
# =========================================================

st.set_page_config(
    page_title="Dashboard Analisis Kesesuaian Pekerjaan",
    page_icon="📊",
    layout="wide"
)

# =========================================================
# PATH
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

data_path = BASE_DIR / "dataset_with_features.csv"
css_path = BASE_DIR / "style.css"

# =========================================================
# LOAD CUSTOM CSS
# =========================================================

if css_path.exists():
    with open(css_path, "r", encoding="utf-8") as file:
        st.markdown(
            f"<style>{file.read()}</style>",
            unsafe_allow_html=True
        )

# =========================================================
# EXTRA CSS
# =========================================================

st.markdown("""
<style>

/* =====================================================
SECTION NAVIGATION BUTTON
===================================================== */

div.stButton > button {
    width: 100%;
    height: 58px;

    border-radius: 16px;

    font-size: 15px;
    font-weight: 700;

    transition: all 0.25s ease;

    border: 1px solid #D6E4FF;

    background-color: #FFFFFF;

    color: #0F3D91;

    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

/* =====================================================
HOVER EFFECT
===================================================== */

div.stButton > button:hover {

    border: 1px solid #1D5FE8;

    color: #1D5FE8;

    background-color: #EAF2FF;

    transform: translateY(-2px);
}

/* =====================================================
ACTIVE BUTTON
===================================================== */

div.stButton > button[kind="primary"] {

    background: linear-gradient(
        135deg,
        #1D5FE8,
        #0F3D91
    ) !important;

    color: white !important;

    border: none !important;

    box-shadow: 0 8px 18px rgba(29,95,232,0.28);
}

/* ACTIVE TEXT */

div.stButton > button[kind="primary"] p {
    color: white !important;
}

/* =====================================================
SMOOTH SECTION ANIMATION
===================================================== */

section.main > div {
    animation: fadeIn 0.35s ease;
}

@keyframes fadeIn {

    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

</style>
""", unsafe_allow_html=True)

# =========================================================
# COLOR
# =========================================================

blue_palette = [
    "#0F3D91",
    "#1D5FE8",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#C7DBFF"
]

card_color = "#FFFFFF"

# =========================================================
# LOAD DATA
# =========================================================

@st.cache_data
def load_data():

    df = pd.read_csv(data_path)

    list_columns = [
        "soft_skills_user",
        "required_soft_skills",
        "hard_skills_user",
        "required_hard_skills_user",
        "matched_skills",
        "skill_gap"
    ]

    for col in list_columns:

        if col in df.columns:

            df[col] = df[col].apply(
                lambda x: ast.literal_eval(x)
                if isinstance(x, str)
                else x
            )

    df["total_user_skills"] = (
        df["soft_skills_user"].apply(len)
        +
        df["hard_skills_user"].apply(len)
    )

    df["total_required_skills"] = (
        df["required_soft_skills"].apply(len)
        +
        df["required_hard_skills_user"].apply(len)
    )

    return df


df = load_data()

# =========================================================
# HELPER BAR CHART
# =========================================================

def bar_chart(data, x_col, y_col, height=500):

    fig = px.bar(
        data,
        x=x_col,
        y=y_col,
        orientation="h",
        text=x_col,
        color=x_col,
        color_continuous_scale=[
            "#DBEAFE",
            "#60A5FA",
            "#1D5FE8"
        ]
    )

    fig.update_traces(
        textposition="inside",
        insidetextfont=dict(
            color="#FFFFFF",
            size=12
        )
    )

    fig.update_layout(
        height=height,
        yaxis=dict(
            categoryorder="total ascending",
            tickfont=dict(
                color="#0F172A",
                size=12
            )
        ),
        xaxis=dict(
            title="Jumlah",
            tickfont=dict(color="#0F172A"),
            gridcolor="#E5EAF5"
        ),
        paper_bgcolor=card_color,
        plot_bgcolor=card_color,
        font=dict(
            color="#0F172A",
            size=13
        ),
        coloraxis_showscale=False,
        margin=dict(
            t=25,
            b=45,
            l=160,
            r=35
        ),
        transition_duration=500
    )

    return fig

# =========================================================
# SIDEBAR
# =========================================================

with st.sidebar:

    logo_path = BASE_DIR / "logo.png"

    if logo_path.exists():

        logo = Image.open(logo_path)

        st.image(
            logo,
            width=180
        )

    st.markdown("## 🔎 Filter Dashboard")

    st.markdown(
        "Gunakan filter untuk menjelajahi data."
    )

    selected_category = st.multiselect(
        "Pilih Kategori",
        options=sorted(df["category"].unique()),
        default=sorted(df["category"].unique())
    )

    role_options = sorted(
        df[
            df["category"].isin(selected_category)
        ]["job_role"].unique()
    )

    selected_role = st.multiselect(
        "Pilih Job Role",
        options=role_options,
        default=role_options
    )

    min_score = st.slider(
        "Minimum Match Score",
        0.0,
        1.0,
        0.0,
        0.05
    )

    top_n = st.slider(
        "Top N Skills",
        5,
        30,
        10
    )

# =========================================================
# FILTER DATA
# =========================================================

filtered_df = df[
    (
        df["category"].isin(selected_category)
    )
    &
    (
        df["job_role"].isin(selected_role)
    )
    &
    (
        df["match_score"] >= min_score
    )
].copy()

# =========================================================
# TITLE
# =========================================================

st.title("Dashboard Analisis Kesesuaian Pekerjaan")

# =========================================================
# KPI
# =========================================================

col1, col2, col3, col4 = st.columns(4)

with col1:

    st.metric(
        "Total Data",
        f"{len(filtered_df):,}",
        "Resume dianalisis"
    )

with col2:

    avg_score = (
        round(
            filtered_df["match_score"].mean(),
            2
        )
        if len(filtered_df)
        else 0
    )

    st.metric(
        "Skor Rata-rata",
        avg_score,
        "Match score"
    )

with col3:

    top_category = (
        filtered_df["category"].mode()[0]
        if len(filtered_df)
        else "-"
    )

    st.metric(
        "Kategori Dominan",
        top_category,
        "Berdasarkan filter"
    )

with col4:

    st.metric(
        "Posisi Unik",
        filtered_df["job_role"].nunique(),
        "Job roles"
    )

st.markdown("<br>", unsafe_allow_html=True)

# =========================================================
# SECTION NAVIGATION
# =========================================================

if "section" not in st.session_state:
    st.session_state.section = "Overview"

nav1, nav2, nav3, nav4 = st.columns(4)

# OVERVIEW

with nav1:

    if st.button(
        "📌 Overview",
        use_container_width=True,
        type=(
            "primary"
            if st.session_state.section == "Overview"
            else "secondary"
        ),
        key="overview_btn"
    ):
        st.session_state.section = "Overview"

# SKILL ANALYSIS

with nav2:

    if st.button(
        "🧠 Skill Analysis",
        use_container_width=True,
        type=(
            "primary"
            if st.session_state.section == "Skill Analysis"
            else "secondary"
        ),
        key="skill_btn"
    ):
        st.session_state.section = "Skill Analysis"

# CATEGORY ANALYSIS

with nav3:

    if st.button(
        "📂 Category Analysis",
        use_container_width=True,
        type=(
            "primary"
            if st.session_state.section == "Category Analysis"
            else "secondary"
        ),
        key="category_btn"
    ):
        st.session_state.section = "Category Analysis"

# MATCH ANALYSIS

with nav4:

    if st.button(
        "📄 Match Analysis",
        use_container_width=True,
        type=(
            "primary"
            if st.session_state.section == "Match Analysis"
            else "secondary"
        ),
        key="match_btn"
    ):
        st.session_state.section = "Match Analysis"

menu = st.session_state.section

st.markdown("<br>", unsafe_allow_html=True)

# =========================================================
# OVERVIEW
# =========================================================

if menu == "Overview":

    row1_col1, row1_col2 = st.columns(2)

    with row1_col1:

        st.subheader("Hard Skill yang Dimiliki Pengguna")

        user_hard = (
            filtered_df["hard_skills_user"]
            .explode()
            .dropna()
            .value_counts()
            .head(top_n)
            .reset_index()
        )

        user_hard.columns = [
            "skill",
            "count"
        ]

        fig = bar_chart(
            user_hard,
            "count",
            "skill"
        )

        st.plotly_chart(
            fig,
            width="stretch"
        )

    with row1_col2:

        st.subheader("Soft Skill yang Dimiliki Pengguna")

        user_soft = (
            filtered_df["soft_skills_user"]
            .explode()
            .dropna()
            .value_counts()
            .head(top_n)
            .reset_index()
        )

        user_soft.columns = [
            "skill",
            "count"
        ]

        fig = bar_chart(
            user_soft,
            "count",
            "skill"
        )

        st.plotly_chart(
            fig,
            width="stretch"
        )

# =========================================================
# SKILL ANALYSIS
# =========================================================

elif menu == "Skill Analysis":

    row2_col1, row2_col2 = st.columns(2)

    with row2_col1:

        st.subheader(
            "Required Hard Skill Paling Dibutuhkan"
        )

        required_hard = (
            filtered_df["required_hard_skills_user"]
            .explode()
            .dropna()
            .value_counts()
            .head(top_n)
            .reset_index()
        )

        required_hard.columns = [
            "skill",
            "count"
        ]

        fig = bar_chart(
            required_hard,
            "count",
            "skill"
        )

        st.plotly_chart(
            fig,
            width="stretch"
        )

    with row2_col2:

        st.subheader(
            "Required Soft Skill Paling Dibutuhkan"
        )

        required_soft = (
            filtered_df["required_soft_skills"]
            .explode()
            .dropna()
            .value_counts()
            .head(top_n)
            .reset_index()
        )

        required_soft.columns = [
            "skill",
            "count"
        ]

        fig = bar_chart(
            required_soft,
            "count",
            "skill"
        )

        st.plotly_chart(
            fig,
            width="stretch"
        )

# =========================================================
# CATEGORY ANALYSIS
# =========================================================

elif menu == "Category Analysis":

    # =====================================================
    # 2 COLUMN LAYOUT
    # =====================================================

    col1, col2 = st.columns(2)

    # =====================================================
    # LEFT CHART
    # =====================================================

    with col1:

        with st.container(border=True):

            # TITLE
            st.markdown(
                """
                <div style="
                    font-size: 18px;
                    font-weight: 700;
                    color: #0F2E6E;
                    margin-bottom: 10px;
                ">
                    Rata-rata Kebutuhan Skill per Kategori
                </div>
                """,
                unsafe_allow_html=True
            )

            # DIVIDER
            st.markdown(
                """
                <hr style="
                    border: 1px solid #D6E4FF;
                    margin-top: 0px;
                    margin-bottom: 20px;
                ">
                """,
                unsafe_allow_html=True
            )

            # =================================================
            # DATA
            # =================================================

            skill_need = (
                filtered_df.groupby("category")[
                    "total_required_skills"
                ]
                .mean()
                .reset_index()
                .sort_values(
                    "total_required_skills",
                    ascending=False
                )
            )

            # =================================================
            # BAR CHART
            # =================================================

            fig = px.bar(
                skill_need,
                x="category",
                y="total_required_skills",
                text="total_required_skills",
                color="total_required_skills",
                color_continuous_scale=[
                    "#DBEAFE",
                    "#60A5FA",
                    "#1D5FE8"
                ]
            )

            # =================================================
            # STYLE
            # =================================================

            fig.update_traces(
                texttemplate="%{text:.2f}",
                textposition="outside"
            )

            fig.update_layout(

                height=360,

                paper_bgcolor="#FFFFFF",
                plot_bgcolor="#FFFFFF",

                coloraxis_showscale=False,

                margin=dict(
                    t=20,
                    b=20,
                    l=20,
                    r=20
                ),

                xaxis=dict(
                    title="category",
                    showgrid=False,
                    tickfont=dict(
                        size=11,
                        color="#64748B"
                    )
                ),

                yaxis=dict(
                    title="total_required_skills",
                    tickfont=dict(
                        size=11,
                        color="#64748B"
                    ),
                    gridcolor="#E2E8F0"
                ),

                font=dict(
                    size=12,
                    color="#0F172A"
                )
            )

            st.plotly_chart(
                fig,
                use_container_width=True,
                config={
                    "displayModeBar": False
                }
            )

    # =====================================================
    # RIGHT CHART
    # =====================================================

    with col2:

        with st.container(border=True):

            # TITLE
            st.markdown(
                """
                <div style="
                    font-size: 18px;
                    font-weight: 700;
                    color: #0F2E6E;
                    margin-bottom: 10px;
                ">
                    Perbedaan Skill Requirement Antar Kategori
                </div>
                """,
                unsafe_allow_html=True
            )

            # DIVIDER
            st.markdown(
                """
                <hr style="
                    border: 1px solid #D6E4FF;
                    margin-top: 0px;
                    margin-bottom: 20px;
                ">
                """,
                unsafe_allow_html=True
            )

            # =================================================
            # BOXPLOT
            # =================================================

            fig = px.box(
                filtered_df,
                x="category",
                y="total_required_skills",
                color="category",
                points="outliers",
                color_discrete_sequence=[
                    "#2563EB",
                    "#3B82F6",
                    "#60A5FA",
                    "#93C5FD",
                    "#BFDBFE"
                ]
            )

            # =================================================
            # STYLE
            # =================================================

            fig.update_traces(

                marker=dict(
                    size=5,
                    opacity=0.8
                ),

                line=dict(
                    width=2
                )
            )

            fig.update_layout(

                height=360,

                paper_bgcolor="#FFFFFF",
                plot_bgcolor="#FFFFFF",

                showlegend=False,

                margin=dict(
                    t=20,
                    b=20,
                    l=20,
                    r=20
                ),

                xaxis=dict(
                    title="category",
                    tickfont=dict(
                        size=11,
                        color="#64748B"
                    )
                ),

                yaxis=dict(
                    title="total_required_skills",
                    tickfont=dict(
                        size=11,
                        color="#64748B"
                    ),
                    gridcolor="#E2E8F0"
                ),

                font=dict(
                    size=12,
                    color="#0F172A"
                )
            )

            st.plotly_chart(
                fig,
                use_container_width=True,
                config={
                    "displayModeBar": False
                }
            )
# =========================================================
# MATCH ANALYSIS
# =========================================================

elif menu == "Match Analysis":

    row5_col1, row5_col2 = st.columns(2)

    with row5_col1:

        st.subheader(
            "Distribusi Match Score"
        )

        fig = px.histogram(
            filtered_df,
            x="match_score",
            nbins=20,
            color_discrete_sequence=["#1D5FE8"]
        )

        st.plotly_chart(
            fig,
            width="stretch"
        )

    with row5_col2:

        st.subheader(
            "Jumlah Skill Pengguna vs Match Score"
        )

        fig = px.scatter(
            filtered_df,
            x="total_user_skills",
            y="match_score",
            color="category",
            color_discrete_sequence=blue_palette,
            hover_data=["job_role"]
        )

        st.plotly_chart(
            fig,
            width="stretch"
        )