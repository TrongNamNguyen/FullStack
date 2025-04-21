import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

//  HARD CODED DATA FOR TESTING
export const PRODUCTS = [
    // Ấo
    {
        id: 1,
        name: "Áo Polo Regular L.3.3440",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg" },
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg" },
            { text: "Be", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 2,
        name: "Áo Polo Regular L.3.3439",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_igNR5AU9VX.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_igNR5AU9VX.jpeg" },
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_LyJnbE6kOj.jpeg" },
            { text: "Ghi", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 3,
        name: "Áo Polo Regular L.3.3440",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg" },
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg" },
            { text: "Be", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 4,
        name: "Áo Polo Regular L.3.3439",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_igNR5AU9VX.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_igNR5AU9VX.jpeg" },
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250327_LyJnbE6kOj.jpeg" },
            { text: "Ghi", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 21,
        name: "Áo Phông Loose L.3.2917",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_mz5pLWzrXZ.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_NfoblSalX7.jpeg" },
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_RscCpCFwUQ.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 22,
        name: "Áo Phông Loose L.5.2882",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250225_itM3gfcFyh.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250225_te6KxTqOKB.jpeg" },
            { text: "Xanh", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250225_ZBT25BkCaK.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 23,
        name: "Áo Phông Loose L.3.2918",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_vnHagN2IyW.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_lZ7AumoH0E.jpeg" },
            { text: "Nâu", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_vnHagN2IyW.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 24,
        name: "Áo Phông Loose L.3.2883",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250320_vnHagN2IyW.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250225_bNPn4Kaqgv.jpeg" },
            { text: "Xám", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250225_n7B9zniT7L.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 25,
        name: "Áo Phông Oversize L.3.2900",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_cBcUGdG74c.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_gkjq0reIqZ.jpeg" },
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_jnw3abcXXk.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 26,
        name: "Áo Phông Oversize L.3.2880",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_MloGIT9gmv.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_odXgXZVFAH.jpeg" },
            { text: "Trắng", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_pWO1ICUfey.jpeg" },
            { text: "Đỏ", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_7Qoc3dx2U0.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 27,
        name: "Áo Phông Loose L.3.2885",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_7lAz6pLYZw.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_fwVBPQwQWK.jpeg" },
            { text: "Rêu", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_O4xjQKAfsY.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 27,
        name: "Áo Phông Loose L.3.2902",
        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_K3YmY6vDUD.jpeg",
        new_price: 100000,
        old_price: 120000,
        category: "Áo Xuân Hè",
        colors: [
            { text: "Đen", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_K3YmY6vDUD.jpeg" },
            { text: "Tím", image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250401_CXfuF6y0yP.jpeg" },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    // Quần
    {
        id: 5,
        name: 'Quần Jean Regular L.3.3440',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20240109_YG2I0D49SQ.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20240109_YG2I0D49SQ.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20240109_ciiL8fgiCB.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20240109_ao0leS8mzx.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 6,
        name: 'Quần Jean Regular L.3.3439',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 7,
        name: 'Quần Short Regular L.3.1648',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 8,
        name: 'Quần Short Regular L.3.1659',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250225_OtrVROVmRT.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 9,
        name: 'Quần Short Slim L.6.1631',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_B6Yn2JYkAb.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 10,
        name: 'Quần Short Regular L.3.1635',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250125_GUnwO5bata.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ]
    },
    {
        id: 11,
        name: 'Quần Âu 31.2.QA084',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250225_4GQ9DmBHLY.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    {
        id: 12,
        name: 'Quần Jeans Loose QJ.30.1.1385',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241216_WJILcLFY1z.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Quần',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
            },
            {
                id: 3,
                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
            },
        ],
        sizes: [
            { text: "S", amount: 100 },
            { text: "M", amount: 10 },
            { text: "L", amount: 10 },
            { text: "XL", amount: 10 },
        ]
    },
    // Phụ kiện
    {
        id: 13,
        name: 'Giày Thể Thao 1.9816',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241220_KnmGR76Weh.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241220_KnmGR76Weh.jpeg'
            },
        ],
        sizes: [
            { text: "40", amount: 100 },
            { text: "41", amount: 10 },
            { text: "42", amount: 10 },
            { text: "43", amount: 10 },
        ]
    },
    {
        id: 14,
        name: 'Giày Thể Thao 2.9817',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241220_tOtYrUbTrK.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241220_fpmxheBzPQ.jpeg'
            },
        ],
        sizes: [
            { text: "40", amount: 100 },
            { text: "41", amount: 10 },
            { text: "42", amount: 10 },
            { text: "43", amount: 10 },
        ]
    },
    {
        id: 16,
        name: 'Giày Thể Thao 1.9815',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241220_jTFtpwgot1.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241220_8qYfUK60lQ.jpeg'
            },
        ],
        sizes: [
            { text: "40", amount: 100 },
            { text: "41", amount: 10 },
            { text: "42", amount: 10 },
            { text: "43", amount: 10 },
        ]
    },
    {
        id: 15,
        name: 'Túi Chéo 1.9359',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241025_5HpObyiR68.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241025_JJZwgOMo4y.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241025_rmUuhKLHPv.jpeg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 20,
        name: 'Túi Chéo 2.9353',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20230706_JKg4aO1hNE.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20230706_0E2j39NXrN.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20230706_qCO1I8P6ZT.jpeg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 17,
        name: 'Túi Chéo 1.9358',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241025_RIDoB9sA76.jpeg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241025_JDICr0ADs5.jpeg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 18,
        name: 'Dây Lưng Atino Da Bò 9900',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20221125_4MP86a4a1vxpJnIN8MMAIr1e.jpg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20221129_iISwLbOV2YT9kqR5tfIRDeTg.jpg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 19,
        name: 'Tất không cổ 5.9601',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20220310_D20u9NKpQSQwEY8FONaglQ9Q.jpg',
        new_price: 500000,
        old_price: 100000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20220310_WLUZg1VvMnypsIUhU1qyYn5o.jpg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20220310_KsptfTdZ78OZvcZSek0pfrdn.jpg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 28,
        name: 'Tất Nam 8.9607',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_KgAElUwpov.jpeg',
        new_price: 50000,
        old_price: 10000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_rzmA1E27EY.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_ewa61VXEEi.jpeg'
            },
            {
                id: 3,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_JTXjaMo2yV.jpegss'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 29,
        name: 'Tất Nam 9.9605',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_KgAElUwpov.jpeg',
        new_price: 50000,
        old_price: 1000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_Qp5eGNOTEs.jpeg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 30,
        name: 'Tất Nam 8.9602',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_UvIgMBs2qO.jpeg',
        new_price: 50000,
        old_price: 20000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_wm2VQCTl29.jpeg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20231223_aOBdZ5Dn1y.jpeg'
            },
        ],
        sizes: [

        ]
    },
    {
        id: 31,
        name: 'Tất ngắn cổ 5.9600',
        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20210613_9AW3CSQP7DGV8d9ZXvzoeyhi.jpg',
        new_price: 50000,
        old_price: 20000,
        category: 'Phụ Kiện',
        colors: [
            {
                id: 1,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20210613_fPAeLVgocg1DaXabcBYXFuKK.jpg'
            },
            {
                id: 2,
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20210613_MN9Q3VUCWwMFAxcbaPjN1mTj.jpg'
            },
        ],
        sizes: [

        ]
    },
]


const ShopContextProvider = (props) => {

    const [products, setProducts] = useState([...PRODUCTS]);

    const getDefaultCart = () => {
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        return cart;
    };

    const [cartItems, setCartItems] = useState(getDefaultCart());

    //   useEffect(() => {
    //     fetch(`${backend_url}/allproducts`)
    //       .then((res) => res.json())
    //       .then((data) => setProducts(data))

    //     if (localStorage.getItem("auth-token")) {
    //       fetch(`${backend_url}/getcart`, {
    //         method: 'POST',
    //         headers: {
    //           Accept: 'application/form-data',
    //           'auth-token': `${localStorage.getItem("auth-token")}`,
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(),
    //       })
    //         .then((resp) => resp.json())
    //         .then((data) => { setCartItems(data) });
    //     }
    //   }, [])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                try {
                    let itemInfo = products.find((product) => product.id === Number(item));
                    totalAmount += cartItems[item] * itemInfo.new_price;
                } catch (error) { }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                try {
                    let itemInfo = products.find((product) => product.id === Number(item));
                    totalItem += itemInfo ? cartItems[item] : 0;
                } catch (error) { }
            }
        }
        return totalItem;
    };

    const addToCart = (itemId) => {
        if (!localStorage.getItem("auth-token")) {
            alert("Please Login");
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem("auth-token")) {
            fetch(`${backend_url}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem("auth-token")) {
            fetch(`${backend_url}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
        }
    };

    const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
