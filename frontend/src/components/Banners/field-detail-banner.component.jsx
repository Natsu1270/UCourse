import React from 'react'

const FieldDetailBanner = ({title, photo, description}) => {
    const s = {
        background: `linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.8)
        ),
        url(${photo}) no-repeat center center / cover`,

    };
    return (
        <section className="section-field-banner">
            <div style={s} className="section-field-banner__content d-flex">
                <div className="section-field-banner__content--body">
                    <h4 className="text--sub__smaller text-white">
                        FIELD
                    </h4>
                    <h1 className="text--main text--main__bigger text-white">
                        {title}
                    </h1>
                    <p className="course-description text--sub text--sub__bigger mt-4">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    )
};

export default FieldDetailBanner