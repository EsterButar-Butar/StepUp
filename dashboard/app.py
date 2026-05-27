import ast
from pathlib import Path

import pandas as pd
import plotly.express as px
import streamlit as st
from PIL import Image


st.set_page_config(
    page_title="Dashboard Analisis Kesesuaian Pekerjaan",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

BASE_DIR = Path(__file__).resolve().parent

data_path = BASE_DIR / "dataset_with_features.csv"
css_path = BASE_DIR / "style.css"
logo_path = BASE_DIR / "logo.png"

if css_path.exists():
    with open(css_path, "r", encoding="utf-8") as file:
        st.markdown(f"<style>{file.read()}</style>", unsafe_allow_html=True)

blue_palette = ["#0F3D91", "#1D5FE8", "#3B82F6", "#60A5FA", "#93C5FD", "#C7DBFF"]
card_color = "#FFFFFF"


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
                lambda x: ast.literal_eval(x) if isinstance(x, str) else x
            )

    df["total_user_skills"] = (
        df["soft_skills_user"].apply(len) +
        df["hard_skills_user"].apply(len)
    )

    df["total_required_skills"] = (
        df["required_soft_skills"].apply(len) +
        df["required_hard_skills_user"].apply(len)
    )

    return df


def show_card_title(title):
    st.markdown(
        f"""
        <div class="chart-title">{title}</div>
        <div class="divider"></div>
        """,
        unsafe_allow_html=True
    )


def bar_chart(data, x_col, y_col, height=500):
    fig = px.bar(
        data,
        x=x_col,
        y=y_col,
        orientation="h",
        text=x_col,
        color=x_col,
        color_continuous_scale=["#DBEAFE", "#60A5FA", "#1D5FE8"]
    )

    fig.update_traces(
        textposition="inside",
        insidetextfont=dict(color="#FFFFFF", size=12),
        hovertemplate="<b>%{y}</b><br>Jumlah: %{x}<extra></extra>"
    )

    fig.update_layout(
        height=height,
        yaxis=dict(
            categoryorder="total ascending",
            tickfont=dict(color="#0F172A", size=12),
            title=""
        ),
        xaxis=dict(
            title="Jumlah",
            tickfont=dict(color="#0F172A"),
            gridcolor="#E5EAF5"
        ),
        paper_bgcolor=card_color,
        plot_bgcolor=card_color,
        font=dict(color="#0F172A", size=13),
        coloraxis_showscale=False,
        margin=dict(t=25, b=45, l=160, r=35),
        transition_duration=500
    )

    return fig


df = load_data()


with st.sidebar:
    st.markdown('<div class="logo-wrapper">', unsafe_allow_html=True)

    if logo_path.exists():
        logo = Image.open(logo_path)
        st.image(logo, width=180)

    st.markdown('</div>', unsafe_allow_html=True)

    st.markdown("## 🔎 Filter Dashboard")
    st.markdown("Gunakan filter untuk menjelajahi data.")

    selected_category = st.multiselect(
        "Pilih Kategori",
        options=sorted(df["category"].unique()),
        default=sorted(df["category"].unique())
    )

    role_options = sorted(
        df[df["category"].isin(selected_category)]["job_role"].unique()
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

    st.info("Filter otomatis memperbarui seluruh visualisasi.")


filtered_df = df[
    (df["category"].isin(selected_category)) &
    (df["job_role"].isin(selected_role)) &
    (df["match_score"] >= min_score)
].copy()


st.title("Dashboard Analisis Kesesuaian Pekerjaan")


col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric("Total Data", f"{len(filtered_df):,}", "Resume dianalisis")

with col2:
    avg_score = round(filtered_df["match_score"].mean(), 2) if len(filtered_df) else 0
    st.metric("Skor Rata-rata", avg_score, "Match score")

with col3:
    top_category = filtered_df["category"].mode()[0] if len(filtered_df) else "-"
    st.metric("Kategori Dominan", top_category, "Berdasarkan filter")

with col4:
    st.metric("Posisi Unik", filtered_df["job_role"].nunique(), "Job roles")


st.markdown("<br>", unsafe_allow_html=True)


if "section" not in st.session_state:
    st.session_state.section = "Overview"

st.markdown('<div class="nav-wrapper">', unsafe_allow_html=True)

nav_row1_col1, nav_row1_col2 = st.columns(2)

with nav_row1_col1:
    if st.button("📌 Overview", use_container_width=True, type="primary" if st.session_state.section == "Overview" else "secondary", key="overview_btn"):
        st.session_state.section = "Overview"

with nav_row1_col2:
    if st.button("🧠 Skill Analysis", use_container_width=True, type="primary" if st.session_state.section == "Skill Analysis" else "secondary", key="skill_btn"):
        st.session_state.section = "Skill Analysis"

nav_row2_col1, nav_row2_col2 = st.columns(2)

with nav_row2_col1:
    if st.button("📂 Category Analysis", use_container_width=True, type="primary" if st.session_state.section == "Category Analysis" else "secondary", key="category_btn"):
        st.session_state.section = "Category Analysis"

with nav_row2_col2:
    if st.button("📄 Match Analysis", use_container_width=True, type="primary" if st.session_state.section == "Match Analysis" else "secondary", key="match_btn"):
        st.session_state.section = "Match Analysis"

st.markdown('</div>', unsafe_allow_html=True)

menu = st.session_state.section

st.markdown("<br>", unsafe_allow_html=True)


if menu == "Overview":
    row1_col1, row1_col2 = st.columns(2)

    with row1_col1:
        with st.container(border=True):
            show_card_title("Hard Skill yang Dimiliki Pengguna")

            user_hard = (
                filtered_df["hard_skills_user"]
                .explode()
                .dropna()
                .value_counts()
                .head(top_n)
                .reset_index()
            )
            user_hard.columns = ["skill", "count"]

            fig = bar_chart(user_hard, "count", "skill")
            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})

    with row1_col2:
        with st.container(border=True):
            show_card_title("Soft Skill yang Dimiliki Pengguna")

            user_soft = (
                filtered_df["soft_skills_user"]
                .explode()
                .dropna()
                .value_counts()
                .head(top_n)
                .reset_index()
            )
            user_soft.columns = ["skill", "count"]

            fig = bar_chart(user_soft, "count", "skill")
            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})


elif menu == "Skill Analysis":
    row2_col1, row2_col2 = st.columns(2)

    with row2_col1:
        with st.container(border=True):
            show_card_title("Required Hard Skill Paling Dibutuhkan")

            required_hard = (
                filtered_df["required_hard_skills_user"]
                .explode()
                .dropna()
                .value_counts()
                .head(top_n)
                .reset_index()
            )
            required_hard.columns = ["skill", "count"]

            fig = bar_chart(required_hard, "count", "skill")
            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})

    with row2_col2:
        with st.container(border=True):
            show_card_title("Required Soft Skill Paling Dibutuhkan")

            required_soft = (
                filtered_df["required_soft_skills"]
                .explode()
                .dropna()
                .value_counts()
                .head(top_n)
                .reset_index()
            )
            required_soft.columns = ["skill", "count"]

            fig = bar_chart(required_soft, "count", "skill")
            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})

    with st.container(border=True):
        show_card_title("Skill Gap Paling Sering Dialami")

        gap_count = (
            filtered_df["skill_gap"]
            .explode()
            .dropna()
            .value_counts()
            .head(top_n)
            .reset_index()
        )
        gap_count.columns = ["skill", "count"]

        fig = bar_chart(gap_count, "count", "skill", height=520)
        st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})


elif menu == "Category Analysis":
    row3_col1, row3_col2 = st.columns(2)

    with row3_col1:
        with st.container(border=True):
            show_card_title("Rata-rata Kebutuhan Skill per Kategori")

            skill_need = (
                filtered_df.groupby("category")["total_required_skills"]
                .mean()
                .reset_index()
                .sort_values("total_required_skills", ascending=False)
            )

            fig = px.bar(
                skill_need,
                x="category",
                y="total_required_skills",
                text="total_required_skills",
                color="total_required_skills",
                color_continuous_scale=["#DBEAFE", "#60A5FA", "#1D5FE8"]
            )

            fig.update_traces(
                texttemplate="%{text:.2f}",
                textposition="outside"
            )

            fig.update_layout(
                height=420,
                paper_bgcolor=card_color,
                plot_bgcolor=card_color,
                coloraxis_showscale=False,
                margin=dict(t=35, b=45, l=55, r=25),
                xaxis=dict(
                    title="",
                    tickfont=dict(size=12, color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                yaxis=dict(
                    title="Rata-rata Jumlah Skill",
                    tickfont=dict(size=12, color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                font=dict(size=13, color="#0F172A")
            )

            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})

    with row3_col2:
        with st.container(border=True):
            show_card_title("Perbedaan Skill Requirement Antar Kategori")

            fig = px.box(
                filtered_df,
                x="category",
                y="total_required_skills",
                color="category",
                points="outliers",
                color_discrete_sequence=blue_palette
            )

            fig.update_layout(
                height=420,
                paper_bgcolor=card_color,
                plot_bgcolor=card_color,
                showlegend=False,
                margin=dict(t=30, b=45, l=55, r=25),
                xaxis=dict(
                    title="",
                    tickfont=dict(size=12, color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                yaxis=dict(
                    title="Jumlah Required Skills",
                    tickfont=dict(size=12, color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                font=dict(size=13, color="#0F172A")
            )

            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})


elif menu == "Match Analysis":
    row5_col1, row5_col2 = st.columns(2)

    with row5_col1:
        with st.container(border=True):
            show_card_title("Distribusi Match Score")

            fig = px.histogram(
                filtered_df,
                x="match_score",
                nbins=20,
                color_discrete_sequence=["#1D5FE8"]
            )

            fig.update_layout(
                height=460,
                paper_bgcolor=card_color,
                plot_bgcolor=card_color,
                font=dict(color="#0F172A", size=13),
                xaxis=dict(
                    title="Match Score",
                    tickfont=dict(color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                yaxis=dict(
                    title="Total Data",
                    tickfont=dict(color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                margin=dict(t=30, b=55, l=65, r=35),
                bargap=0.12
            )

            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})

    with row5_col2:
        with st.container(border=True):
            show_card_title("Jumlah Skill Pengguna vs Match Score")

            fig = px.scatter(
                filtered_df,
                x="total_user_skills",
                y="match_score",
                color="category",
                color_discrete_sequence=blue_palette,
                hover_data=["job_role"]
            )

            fig.update_layout(
                height=460,
                paper_bgcolor=card_color,
                plot_bgcolor=card_color,
                font=dict(color="#0F172A", size=13),
                xaxis=dict(
                    title="Jumlah Skill Pengguna",
                    tickfont=dict(color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                yaxis=dict(
                    title="Match Score",
                    tickfont=dict(color="#0F172A"),
                    gridcolor="#E5EAF5"
                ),
                margin=dict(t=30, b=55, l=65, r=35),
                legend=dict(font=dict(color="#0F172A"))
            )

            st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})

    with st.container(border=True):
        show_card_title("Data Hasil Pencocokan")

        table_df = filtered_df[
            [
                "job_role",
                "category",
                "education",
                "education_requirement",
                "required_hard_skills_user",
                "required_soft_skills",
                "matched_skills",
                "skill_gap",
                "match_score"
            ]
        ].head(25).copy()

        list_columns = [
            "required_hard_skills_user",
            "required_soft_skills",
            "matched_skills",
            "skill_gap"
        ]

        for col in list_columns:
            table_df[col] = table_df[col].apply(
                lambda x: ", ".join(x) if isinstance(x, list) else x
            )

        st.caption(f"Menampilkan 25 dari {len(filtered_df)} data hasil filter.")

        st.markdown(
            table_df.to_html(index=False, classes="custom-table", escape=False),
            unsafe_allow_html=True
        )